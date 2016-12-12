import webdriver from 'selenium-webdriver';

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
      driver.findElement(elements.login).click();
    },
    confirm: function() {
      driver.wait(until.elementLocated(elements.confirm));
      driver.findElement(elements.confirm).click();
    }
  };
}
