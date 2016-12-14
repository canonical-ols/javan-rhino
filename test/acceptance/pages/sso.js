import webdriver, { Key } from 'selenium-webdriver';

const By = webdriver.By;
const until = webdriver.until;

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
      driver.findElement(elements.email).sendKeys(process.env.TEST_USER_EMAIL);
      driver.findElement(elements.password).sendKeys(process.env.TEST_USER_PASSWORD);
      return driver.findElement(elements.login).click();
    },
    confirm: function() {
      driver.wait(until.elementLocated(elements.confirm));
      // XXX FF50 didn't like click on this button!?
      return driver.findElement(elements.confirm).sendKeys(Key.ENTER);
      // XXX beowulf - if in dev and on HTTP FF will stall here with a security alert, if
      // it's not an issue in real testing I can live with it in dev for now.
    }
  };
}
