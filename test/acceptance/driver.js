import { Builder } from 'selenium-webdriver';

const BS_KEY = process.env.BROWSERSTACK_KEY;
const BS_USER = process.env.BROWSERSTACK_USER;

const capabilities = {
  'project': 'my.staging.ubuntu.com',
  //'browserstack.debug': true,
  'browserstack.user': BS_USER,
  'browserstack.key': BS_KEY
};

const driver = new Builder()
  .withCapabilities(capabilities)
  .build();

export default driver;
