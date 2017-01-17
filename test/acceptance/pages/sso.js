import webdriver from 'selenium-webdriver';

import conf from '../conf.js';

const By = webdriver.By;
const until = webdriver.until;
const TEST_USER_EMAIL = conf.get('TEST_USER_EMAIL');
const TEST_USER_PASSWORD = conf.get('TEST_USER_PASSWORD');

export default function(driver) {

  const elements = {
    email: By.id('id_email'),
    password: By.id('id_password'),
    login: By.css('[data-qa-id=\'login_button\']'),
    confirm: By.css('[data-qa-id=\'rp_confirm_login\']'),
  };

  return {
    login: function() {
      driver.wait(until.elementLocated(elements.email));
      driver.findElement(elements.email).sendKeys(TEST_USER_EMAIL);
      driver.findElement(elements.password).sendKeys(TEST_USER_PASSWORD);
      return driver.findElement(elements.login).click();
    },
    confirm: function() {
      driver.wait(until.elementLocated(elements.confirm));
      driver.findElement(elements.confirm);
      return driver.findElement(elements.confirm).click();
      // XXX beowulf - if in dev and on HTTP FF will stall here with a security
      // alert, it's not an issue in real testing, can live with it in dev for
      // now.
    }
  };
}
