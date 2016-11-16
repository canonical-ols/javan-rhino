import stripAnsi from 'strip-ansi';
import expect from 'expect';
import sinon from 'sinon';
import stdMocks from 'std-mocks';

import logging from '../../../../../src/server/logging';
import { serialize } from '../../../../../src/server/logging/lib/log-formatter';

/*eslint no-console: 'off' */
describe('logger', () => {
  describe('serializer', () => {

    it('should not quote simple tags', () => {
      expect(serialize({ foo: 'bar' }))
        .toEqual('foo=bar');
    });

    it('should quote values with spaces', () => {
      expect(serialize({ foo: 'bar', bar: 'baz qux' }))
        .toEqual('foo=bar, bar="baz qux"');
    });

    it('should handle values containing periods', () => {
      expect(serialize({ 'foo': 'x.y' })).toEqual('foo=x.y');
    });

    it('should reformat keys containing spaces', () => {
      expect(serialize({ 'foo bar': 'baz' })).toEqual('foo_bar=baz');
    });

    it('should reformat keys containing equal sign', () => {
      expect(serialize({ 'foo=bar': 'baz' })).toEqual('foo_bar=baz');
    });

    it('should reformat keys containing commas', () => {
      expect(serialize({ 'foo,bar': 'baz' })).toEqual('foo_bar=baz');
    });

    it('should reformat keys with quotes', () => {
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
      const logger = logging.getLogger('test123');
      logger.info(message, tags);
      line = stdMocks.flush().stderr[0];
      line = stripAnsi(line);
    });

    afterEach(() => {
      stdMocks.restore();
      clock.restore();
    });

    it('should log with correct format', () => {
      expect(line).toBe(
        '1970-01-01 00:00:00.000Z INFO test123 "make logs \\\"great\\\" again" foo=bar, baz="qux quux"\n');
    });

    it('should log to stderr', () => {
      expect(line).toExist();
    });

    it('should log with correct date format', () => {
      expect(line).toMatch(/1970-01-01 00:00:00.000Z/);
    });

    it('should include level in log', () => {
      expect(line).toMatch(/ INFO /);
    });

    it('should include logger name in log', () => {
      expect(line).toMatch(/ test123 /);
    });

    it('should include logged message, quoted', () => {
      expect(line).toMatch(new RegExp(/ \"make logs \\\"great\\\" again\" /));
    });

    it('should include logged tags, logfmt style', () => {
      expect(line).toMatch(/ foo=bar/);
    });

    describe('errors', () => {
      beforeEach(() => {
        const logger = logging.getLogger('test324');
        try {
          throw new Error('this thing failed');
        } catch (e) {
          logger.info(e);
        }
        line = stdMocks.flush().stderr[0];
        line = stripAnsi(line);
      });
      it('should log error message to meta/tags', () => {
        expect(line).toMatch(/message="this thing failed"/);
      });
      it('should log stacktrace to meta/tags', () => {
        expect(line).toMatch(/stack="Error: this thing failed/);
      });
    });


  });
});
