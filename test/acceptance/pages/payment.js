import webdriver from 'selenium-webdriver';

const By = webdriver.By;
const until = webdriver.until;

export default function(driver) {

  const elements = {
    ssoEmail: By.id('id_email'),
    ssoPassword: By.id('id_password'),
    ssoLogin: By.css('[data-qa-id=\'login_button\']'),
    ssoConfirm: By.css('[data-qa-id=\'rp_confirm_login\']'),
    loginButton: byData('sign-in:login'),
    username: byData('sign-in:username'),
    cardNumber: By.id('ID_INPUT_FIELD_cardNumber'),
    expiryDate: By.id('ID_INPUT_FIELD_expiryDate'),
    securityNumber: By.id('ID_INPUT_FIELD_securityNumber'),
    addressFullName: By.id('ID_INPUT_FIELD_billingFullname'),
    addressLine1: By.id('ID_INPUT_FIELD_billingAddress1'),
    addressLine2: By.id('ID_INPUT_FIELD_billingAddress2'),
    addressState: By.id('ID_INPUT_FIELD_billingState'),
    addressCity: By.id('ID_INPUT_FIELD_billingCity'),
    addressPostcode: By.id('ID_INPUT_FIELD_billingPostcode'),
    addressPhone: By.id('ID_INPUT_FIELD_billingPhone'),
    addressCountry: By.css('#ID_INPUT_FIELD_billingCountry'),
    termsCheckbox: By.css('#ID_CHECKBOX_FIELD_tosAccepted'),
    submitButton: byData('payments-form:submit'),
    successThanks: byData('customer-success:thanks')
  };

  // XXX remove this 
  function untilElementValueIs(element, entry) {
    return driver.findElement(element).getAttribute('value')
      .then((value) => {
        return value === entry;
      });
  }

  return {
    url: 'http://localhost:3000',
    login: function() {
      driver.navigate().to(this.url);
      driver.wait(until.elementLocated(elements.loginButton));
      driver.findElement(elements.loginButton).click();
      driver.wait(until.elementLocated(elements.ssoEmail));
      driver.findElement(elements.ssoEmail).sendKeys(process.env.TEST_USER_EMAIL);
      driver.findElement(elements.ssoPassword).sendKeys(process.env.TEST_USER_PASSWORD);
      driver.findElement(elements.ssoLogin).click();
      driver.wait(until.elementLocated(elements.ssoConfirm));
      driver.findElement(elements.ssoConfirm).click();
      driver.wait(until.elementLocated(elements.username));
    },
    getUsername: function() {
      return driver.findElement(elements.username).getText();
    },
    enterCardNumber: function(number) {
      driver.findElement(elements.cardNumber).sendKeys(number);
      return driver.wait(untilElementValueIs(elements.cardNumber, number));
    },
    enterCardExpiryDate: function(mmyy = expiryDate()) {
      driver.findElement(elements.expiryDate).sendKeys(mmyy);
      return driver.wait(untilElementValueIs(elements.expiryDate, mmyy));
    },
    enterCardSecurityNumber: function(cvc) {
      driver.findElement(elements.securityNumber).sendKeys(cvc);
      return driver.wait(untilElementValueIs(elements.securityNumber, cvc));
    },
    enterAddressName: function(fullname) {
      driver.findElement(elements.addressFullName).sendKeys(fullname);
      return driver.wait(untilElementValueIs(elements.addressFullName, fullname));
    },
    enterAddressLine1: function(line) {
      driver.findElement(elements.addressLine1).sendKeys(line);
      return driver.wait(untilElementValueIs(elements.addressLine1, line));
    },
    enterAddressLine2: function(line) {
      driver.findElement(elements.addressLine2).sendKeys(line);
      return driver.wait(untilElementValueIs(elements.addressLine2, line));
    },
    enterAddressState: function(state) {
      driver.findElement(elements.addressState).sendKeys(state);
      return driver.wait(untilElementValueIs(elements.addressState, state));
    },
    enterAddressCity: function(city) {
      driver.findElement(elements.addressCity).sendKeys(city);
      return driver.wait(untilElementValueIs(elements.addressCity, city));
    },
    enterAddressPostcode: function(postcode) {
      driver.findElement(elements.addressPostcode).sendKeys(postcode);
      return driver.wait(untilElementValueIs(elements.addressPostcode, postcode));
    },
    enterAddressPhone: function(number) {
      driver.findElement(elements.addressPhone).sendKeys(number);
      return driver.wait(untilElementValueIs(elements.addressPhone, number));
    },
    selectAddressCountry: function(code = 'GB') {
      return driver.findElement(
        By.css(`#ID_SELECT_FIELD_billingCountry > option[value='${code}']`)
      ).click();
    },
    acceptTerms: function() {
      return driver.findElement(elements.termsCheckbox).click();
    },
    getSubmitButton: function() {
      return driver.findElement(elements.submitButton);
    },
    getSuccessThanks: function() {
      return driver.findElement(elements.successThanks);
    },
    submit: function() {
      driver.wait(until.elementIsEnabled(this.getSubmitButton()));
      return this.getSubmitButton().click();
    },
    getPaymentSuccess: function() {
      driver.wait(until.elementLocated(elements.successThanks));
      return this.getSuccessThanks().getText();
    }
  };
}

function byData(value) {
  return By.css(`[data-qa='${value}']`);
}

function expiryDate(date) {
  date = date || new Date();
  let month = date.getMonth();
  let year = date.getFullYear() + '';
  year = year.substr(-2);

  month += 1;
  month = (month < 10) ? (month + '0') : month;

  return `${month}/${year}`;
}
