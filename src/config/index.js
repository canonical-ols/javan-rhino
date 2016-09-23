export class Config {
  constructor(config) {
    // https://github.com/purposeindustries/window-or-global/blob/master/lib/index.js
    // Establish the root object, `window` in the browser, or `global` on the server.
    let root = typeof self == 'object' && self.Object == Object && self;
    // root is window, we expect it to have config
    if (root && !root.__CONFIG__) {
      throw new ReferenceError('Client config: no config defined.');
    }
    // root is not window; test for node global and assign to avoid ref error
    // we don't expect config here, this is client side only, but we can set it
    // for unit tests
    root = root || (typeof global == 'object' && global.Object == Object && global);

    this._store = config || root.__CONFIG__;
  }

  get(key) {
    if ('undefined' === typeof(key)) {
      return this._store;
    }

    if (!this._store.hasOwnProperty(key)) {
      return undefined;
    }

    return this._store[key];
  }
}

export default new Config();
