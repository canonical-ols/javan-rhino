import { Builder } from 'selenium-webdriver';
import test from 'selenium-webdriver/testing';
import expect from 'expect';

import PaymentPage from './pages/payment.js';

const driver = new Builder()
  .forBrowser('chrome') // chromedriver required, see README
  .build();

const page = PaymentPage(driver);

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
    expect( yield page.acceptTerms()).toBe(true);
  });

  test.it('should successfully submit', function*() {
    page.submit();
    expect( yield page.getPaymentSuccess() ).toMatch('thank you');
  });

});
