const webdriver = require('selenium-webdriver');

const By = webdriver.By;

export default (driver) => ({
  sendAndVerifyKeys: function(keys, element, timeout=1000) {
    driver.findElement(element).sendKeys(keys);
    return driver.wait(this.untilElementValueIs(element, keys), timeout);
  },
  findElement: function(value) {
    return driver.findElement(By.css(`[data-qa='${ value }']`));
  },
  untilElementValueIs: function(element, entered) {
    return driver.findElement(element).getAttribute('value')
      .then((value) => {
        return value === entered;
      });
  }
});
