const webdriver = require('selenium-webdriver');

const By = webdriver.By;

module.exports = (driver) => ({
  findElement: function(value) {
    return driver.findElement(By.css(`[data-qa='${ value }']`));
  }
});
