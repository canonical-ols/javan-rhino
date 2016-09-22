import expect from 'expect';

import conf, { Config } from '../../../src/config';

// TODO browser only tests vrs node only tests
describe('Config', () => {
  let c;

  it('should not throw when instantiated server side', () => {
    expect(() => {
      new Config();
    }).toNotThrow();
  });

  describe('default export', () => {
    it('should be an instance of Config', () => {
      expect(conf).toBeA(Config);
    });
  });

  describe('instance with supplied values', () => {
    beforeEach(() => {
      c = new Config({
        'FOO': 'bar'
      });
    });

    it('should return existing values', () => {
      expect(c.get('FOO')).toBe('bar');
    });

    it('should return undefined for non-existant values', () => {
      expect(c.get('BAR')).toBe(undefined);
    });
  });

});
