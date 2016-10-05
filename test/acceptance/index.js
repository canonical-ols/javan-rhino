import webdriver, { Builder } from 'selenium-webdriver';
import expect from 'expect';

import conf from '../../server/configure.js';
import Util from './utils';

const driver = new Builder().forBrowser('phantomjs').build();

const util = Util(driver);

// ask the browser to open a page

describe('sign in', () => {

  before(() => {
    driver.navigate().to(conf.get('UNIVERSAL:MU_URL'));
  });

  after(() => {
    driver.quit();
  });

  it('Should have sign in anchor', function*() {
    expect(yield util.findElement('sign-in:login').getText()).toExist();
  });

  it('Should do stuff', function() {
    util.findElement('sign-in:login').click();
  });

});
