import nconf from 'nconf';
import untildify from 'untildify';

nconf
  .argv()
  .env([
    'BROWSERSTACK_KEY',
    'BROWSERSTACK_USERNAME',
    'TEST_USER_EMAIL',
    'TEST_USER_PASSWORD'
  ])
  .file(untildify('~/.config/my-ubuntu/secrets.json'));

export default nconf;
