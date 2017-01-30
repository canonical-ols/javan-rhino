import expect from 'expect';
import lynx from 'lynx';

import {
  createStatsdClient,
  createStatName
} from '../../../../../src/server/middleware/metrics';

describe('metrics middleware', function() {

  let client;
  let req;
  let res;

  beforeEach(function() {
    req = {
      url: '/foo/bar',
      method: 'GET'
    };
    res = {
      statusCode: 200
    };

    client = createStatsdClient('udp://localhost:1234', 'ols.');
  });

  describe('createStatsdClient', function() {

    it('should create a lynx instance', function() {
      expect(client).toBeA(lynx);
    });

    it('should have correct scope', function() {
      expect(client.scope).toBe('ols.');
    });

  });

  describe('createStatName', function() {

    it('should create a stat name', function() {
      expect(createStatName('staging', 'unit', req, res))
        .toBe('staging.mu.unit.views.foo_bar.GET.200.response');
    });

    it('should filter missing name parts', function() {
      expect(createStatName('staging', null, req, res))
        .toBe('staging.mu.views.foo_bar.GET.200.response');
    });

    it('should sanitise urls', function() {
      expect(createStatName('staging', null, req, res))
        .toBe('staging.mu.views.foo_bar.GET.200.response');
    });

    it('should default to devel', function() {
      expect(createStatName(undefined, undefined, req, res))
        .toBe('devel.mu.views.foo_bar.GET.200.response');
    });
  });
});
