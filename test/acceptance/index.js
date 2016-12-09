import { Builder } from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import expect from 'expect';

import PaymentPage from './pages/payment.js';

const driver = new Builder()
  .forBrowser('phantomjs')
  .build();

const page = PaymentPage(driver);

// TODO assumes server is running :)

test.describe('authenticated session', () => {

  test.before(() => page.login());

  test.after(() => driver.quit());

  test.it('should have test account username', function*() {
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

  test.it('should allow entering security number', function() {
    page.enterAddressName('Acceptance Test User');
    page.enterAddressLine1('Webdriver Lane');
    page.enterAddressState('Testing');
    page.enterAddressCity('Testington-upon-sea');
    page.enterAddressPostcode('WD1 0AA');
    page.selectAddressCountry();
    page.acceptTerms();
  });

  test.it('should successfully submit', function*() {
    page.submit();
    expect( yield page.getPaymentSuccess() ).toMatch('thank you');
  });

});

