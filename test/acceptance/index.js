import webdriver, { Builder } from 'selenium-webdriver';
import expect from 'expect';

import conf from '../../src/server/configure.js';
import Util from './utils';
const By = webdriver.By;
const until = webdriver.until;

const driver = new Builder()
  .forBrowser('chrome')
  .build();

const util = Util(driver);
const MU_URL = conf.get('UNIVERSAL:MU_URL');

// ask the browser to open a page
// TODO assumes server is running :)

describe('sign in', () => {

  before(() => driver.navigate().to(MU_URL));

  after(() => driver.quit());

  it('should allow user to login', function*() {
    const rpConfirmSelector = '[data-qa-id=\'rp_confirm_login\']';

    driver.findElement(byData('sign-in:login')).click();
    driver.wait(until.elementLocated(By.id('id_email')));
    driver.findElement(By.id('id_email'))
      .sendKeys(process.env.TEST_USER_EMAIL);
    driver.findElement(By.id('id_password'))
      .sendKeys(process.env.TEST_USER_PASSWORD);
    driver.findElement(By.css('[data-qa-id=\'login_button\']')).click();

    // Ubuntu SSO
    driver.wait(until.elementLocated(By.css(rpConfirmSelector)));
    driver.findElement(By.css(rpConfirmSelector)).click();

    // MU
    expect( yield driver.wait(until.titleContains('my.ubuntu.com'))).toBe(true);
  });

  it('should have test account username', function*() {
    expect(yield driver.findElement(byData('sign-in:username'))
      .getText()).toBe('MU STAGING TEST USER');
  });

  it('should have logout button', function*() {
    expect(yield driver.findElement(byData('sign-in:logout'))).toExist();
  });

});

function byData(value) {
  return By.css(`[data-qa='${value}']`);
}
