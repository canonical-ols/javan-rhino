require('babel-register');
require('babel-polyfill');
const Mocha = require('mocha');
const glob = require('glob');
const path = require('path');

const files = glob.sync('/**/t_*.js', {
  root: 'test/acceptance'
});
const mocha = new Mocha({
  timeout: 20000
});

for (let file of files) {
  mocha.addFile(
    path.join(file)
  );
}
mocha.run((failures) => {
  process.on('exit', () => {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});
