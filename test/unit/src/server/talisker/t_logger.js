import chalk from 'chalk';
import expect from 'expect';
import sinon from 'sinon';
import stdMocks from 'std-mocks';
import winston from 'winston';

import '../../../../../src/server/talisker/logger.js';
import { serialize } from '../../../../../src/server/talisker/lib/log-formatter';

/*eslint no-console: 'off' */
describe('logger', () => {
  describe('serializer', () => {

    it('should format simple tags', () => {
      expect(serialize({ foo: 'bar', baz: 'qux quux' }))
        .toEqual('foo=bar, baz="qux quux"');
    });

    it('should format values with spaces', () => {
      expect(serialize({ foo: 'bar', bar: 'baz qux' }))
        .toEqual('foo=bar, bar="baz qux"');
    });

    it('should format values with dots', () => {
      expect(serialize({ 'foo': 'x.y' })).toEqual('foo=x.y');
    });

    it('should format keys with spaces', () => {
      expect(serialize({ 'foo bar': 'baz' })).toEqual('foo_bar=baz');
    });

    it('should format keys with equal sign', () => {
      expect(serialize({ 'foo=bar': 'baz' })).toEqual('foobar=baz');
    });


    it('should format keys with equal sign', () => {
      expect(serialize({ '"foo"': 'bar' })).toEqual('foo=bar');
    });
  });

  describe('app logger', () => {

    const message = 'make logs "great" again';
    const tags = {
      foo: 'bar',
      baz: 'qux quux'
    };
    let clock;
    let line;

    beforeEach(() => {
      // mock Date
      clock = sinon.useFakeTimers();
      stdMocks.use({
        stdout: false
      });

      // log then capture stderr
      winston.info(message, tags);
      line = stdMocks.flush().stderr[0];
    });

    afterEach(() => {
      stdMocks.restore();
      clock.restore();
    });

    it('should log with correct format', () => {
      expect(line).toBe(
        `${chalk.magenta('1970-01-01 00:00:00.000Z')} INFO app "make logs \\\"great\\\" again" foo=bar, baz="qux quux"\n`);
    });

    it('should log to stderr', () => {
      expect(line).toExist();
    });

    it('should log with correct date format', () => {
      expect(line).toMatch(/1970-01-01 00:00:00.000Z/);
    });

    it('should include level in log', () => {
      expect(line).toMatch(/INFO/);
    });

    it('should include logger label in log', () => {
      expect(line).toMatch(/app/);
    });

    it('should include logged message, quoted', () => {
      expect(line).toMatch(new RegExp(/\"make logs \\\"great\\\" again\"/));
    });

    it('should include logged tags, logfmt style', () => {
      expect(line).toMatch(/foo=bar/);
    });

  });
});
