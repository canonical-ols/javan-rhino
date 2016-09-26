import expect from 'expect';

// Stub out loading of CSS dependencies
require.extensions['.css'] = () => {};
require.extensions['.svg'] = () => 'example.svg';
require.extensions['.png'] = () => 'example.png';
require.extensions['.gif'] = () => 'example.gif';
require.extensions['.jpg', '.jpeg'] = () => 'example.jpg';

const conf = require('../../server/configure.js');
global.__CONFIG__ = {
  UNIVERSAL: conf.get('UNIVERSAL')
};

// Custom assertions
expect.extend({
  toHaveActionOfType(expected) {
    expect.assert(
      this.actual.filter((action) => {
        return action.type === expected;
      }).length > 0,
      'to have action %s',
      expected
    );

    return this;
  }
});
