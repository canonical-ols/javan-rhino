import webdriver from 'selenium-webdriver';

import SsoPage from './sso';
import Utils from './../utils';


const By = webdriver.By;
const until = webdriver.until;

export default function(driver) {

  const sso = SsoPage(driver);
  const utils = Utils(driver);
  const elements = {
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

  return {
    url: 'http://localhost:3000',
    login: function() {
      // TODO should be in an sso page object
      driver.navigate().to(this.url);
      driver.wait(until.elementLocated(elements.loginButton));
      driver.findElement(elements.loginButton).click();
      sso.login();
      sso.confirm();
      return driver.wait(until.elementLocated(elements.username));
    },
    getUsername: function() {
      return driver.findElement(elements.username).getText();
    },
    enterCardNumber: function(number) {
      return utils.sendAndVerifyKeys(number, elements.cardNumber);
    },
    enterCardExpiryDate: function(mmyy = getExpiryDate()) {
      return utils.sendAndVerifyKeys(mmyy, elements.expiryDate);
    },
    enterCardSecurityNumber: function(cvc) {
      return utils.sendAndVerifyKeys(cvc, elements.securityNumber);
    },
    enterAddressName: function(fullname) {
      return utils.sendAndVerifyKeys(fullname, elements.addressFullName);
    },
    enterAddressLine1: function(line) {
      return utils.sendAndVerifyKeys(line, elements.addressLine1);
    },
    enterAddressLine2: function(line) {
      return utils.sendAndVerifyKeys(line, elements.addressLine2);
    },
    enterAddressState: function(state) {
      return utils.sendAndVerifyKeys(state, elements.addressState);
    },
    enterAddressCity: function(city) {
      return utils.sendAndVerifyKeys(city, elements.addressCity);
    },
    enterAddressPostcode: function(postcode) {
      return utils.sendAndVerifyKeys(postcode, elements.addressPostcode);
    },
    enterAddressPhone: function(number) {
      return utils.sendAndVerifyKeys(number, elements.addressPhone);
    },
    selectAddressCountry: function(code = 'GB') {
      const country = driver.findElement(
        By.css(`#ID_SELECT_FIELD_billingCountry > option[value='${code}']`)
      );
      country.click();
      return country.getAttribute('value')
        .then((value) => {
          return new Promise((resolve, reject) => {
            if (value === code) {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
    },
    acceptTerms: function() {
      const terms = driver.findElement(elements.termsCheckbox);
      terms.click();
      return terms.getAttribute('checked')
        .then((value) => {
          return new Promise((resolve, reject) => {
            if (value === 'true') {
              resolve(true);
            } else {
              reject(false);
            }
          });
        });
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

function getExpiryDate(date) {
  date = date || new Date();
  let month = date.getMonth();
  let year = date.getFullYear() + '';
  year = year.substr(-2);

  month += 1;
  month = (month < 10) ? (month + '0') : month;

  return `${month}/${year}`;
}
