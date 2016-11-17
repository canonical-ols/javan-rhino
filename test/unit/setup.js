import './helpers';

// Stub out loading of CSS dependencies
require.extensions['.css'] = () => {};
require.extensions['.svg'] = () => 'example.svg';
require.extensions['.png'] = () => 'example.png';
require.extensions['.gif'] = () => 'example.gif';
require.extensions['.jpg', '.jpeg'] = () => 'example.jpg';

const conf = require('../../src/server/configure.js');

global.__CONFIG__ = {
  UNIVERSAL: conf.get('UNIVERSAL')
};
