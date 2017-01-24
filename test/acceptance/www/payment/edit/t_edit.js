import { Builder } from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import expect from 'expect';
import request from 'request';
import { httpsOverHttp } from 'tunnel-agent';
import url from 'url';

import conf from '../../../conf';
import PaymentPage from '../../../pages/payment';

const BS_KEY = conf.get('BROWSERSTACK_KEY');
const BS_USER = conf.get('BROWSERSTACK_USERNAME');
const TEST_USER_EMAIL = conf.get('TEST_USER_EMAIL');
const TEST_USER_PASSWORD = conf.get('TEST_USER_PASSWORD');

const capabilities = {
  build: Date.now().toString(36),
  project: 'my.staging.ubuntu.com',
  'browserstack.user': BS_USER,
  'browserstack.key': BS_KEY,
};

const browsers = [{
  browserName: 'chrome',
  os: 'Windows',
  os_version: '10',
}, {
  browserName: 'firefox',
  os: 'Windows',
  os_version: '10',
}, {
  browserName: 'chrome',
  os: 'OS X',
  os_version: 'Sierra',
}, {
  browserName: 'firefox',
  os: 'OS X',
  os_version: 'Sierra',
}];

let proxyUrl = false;

if (process.env.HTTP_PROXY) {
  proxyUrl = url.parse(process.env.HTTP_PROXY);
}

for (let browser of browsers) {

  test.describe(`authenticated session (${browser.browserName}/${browser.os})`, function() {
    let driver;
    let sessionId;
    let page;

    this.retries(3);
    this.slow(1000);

    test.before(function() {
      if(!(TEST_USER_EMAIL && TEST_USER_PASSWORD)) {
        // eslint-disable-next-line
        console.log('skipping test suite, missing sso creds!');
        this.skip();
      }
      if(!(BS_KEY && BS_USER)) {
        // eslint-disable-next-line
        console.log('skipping test suite, missing browserstack creds!');
        this.skip();
      }

      const builder = new Builder()
        .usingServer('https://hub.browserstack.com/wd/hub')
        .withCapabilities({
          ...capabilities,
          ...browser
        });

      if (proxyUrl) {
        builder.usingHttpAgent(httpsOverHttp({
          proxy: {
            host: proxyUrl.hostname,
            port: proxyUrl.port
          }
        }));
      }

      driver = builder.build();

      driver.session_.then((sessionData) => {
        sessionId = sessionData.id_;
      });

      page = PaymentPage(driver);

    });

    test.afterEach(function() {
      if (this.currentTest.state === 'failed') {
        request({
          uri: `https://${BS_USER}:${BS_KEY}@www.browserstack.com/automate/sessions/${sessionId}.json`,
          method:'PUT',
          form: {
            'status': 'failed',
            'reason': ''
          }
        });
      }
    });

    test.after(function() {
      driver.quit();
    });

    test.it('should navigate to payments web site', function() {
      expect(function() {
        page.navigate();
      }).toNotThrow();
    });

    test.it('should sign in via ubuntu one', function() {
      expect(function() {
        page.login();
      }).toNotThrow();
    });

    test.it('should have test account username in header', function*() {
      expect( yield page.getUsername() ).toBe('MU STAGING TEST USER');
    });

    test.it('should allow entering card number', function*() {
      expect( yield page.enterCardNumber('4242424242424242')).toBe(true);
    });

    test.it('should allow entering expiry date', function*() {
      expect( yield page.enterCardExpiryDate()).toBe(true);
    });

    test.it('should allow entering security number', function*() {
      expect( yield page.enterCardSecurityNumber('123')).toBe(true);
    });

    test.it('should allow entering full name', function*() {
      expect( yield page.enterAddressName('Acceptance Test User')).toBe(true);
    });

    test.it('should allow entering address', function*() {
      expect( yield page.enterAddressLine1('Webdriver Lane')).toBe(true);
    });

    test.it('should allow entering state', function*() {
      expect( yield page.enterAddressState('Testing') ).toBe(true);
    });

    test.it('should allow entering city', function*() {
      expect( yield page.enterAddressCity('Testington-upon-sea')).toBe(true);
    });

    test.it('should allow entering postcode', function*() {
      expect( yield page.enterAddressPostcode('WD1 0AA')).toBe(true);
    });

    test.it('should allow selecting country', function*() {
      expect( yield page.selectAddressCountry('GB')).toBe(true);
    });

    test.it('should allow accepting terms', function*() {
      // XXX accepting terms should enable submit button
      expect( yield page.acceptTerms()).toBe(true);
    });

    test.it('should successfully submit', function*() {
      page.submit();
      // XXX assert no error message
      expect( yield page.getPaymentSuccess() ).toMatch('thank you');
    });

  });
}
