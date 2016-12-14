import { Builder } from 'selenium-webdriver';

const BS_KEY = process.env.BROWSERSTACK_KEY;
const BS_USER = process.env.BROWSERSTACK_USERNAME;

const capabilities = {
  'project': 'my.staging.ubuntu.com',
  'browserstack.user': BS_USER,
  'browserstack.key': BS_KEY,
  'browserName': 'Firefox',
  'browser_version': '50',
  'os': 'Windows',
  'os_version': '10',
  //'browserstack.debug': true
};

const driver = new Builder()
  .withCapabilities(capabilities)
  .build();

export default driver;
