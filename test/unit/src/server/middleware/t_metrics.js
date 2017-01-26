import expect from 'expect';

import {
  createStatName
} from '../../../../../src/server/middleware/metrics';

describe('metrics middleware', function() {

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
  });

  describe('createStatName', function() {

    it('should create a stat name', function() {
      expect(createStatName('staging', 'unit', req, res))
        .toBe('statsd.ols.staging.mu.unit.views.foo_bar.GET.200.response');
    });

    it('should filter missing name parts', function() {
      expect(createStatName('staging', null, req, res))
        .toBe('statsd.ols.staging.mu.views.foo_bar.GET.200.response');
    });

    it('should sanitise urls', function() {
      expect(createStatName('staging', null, req, res))
        .toBe('statsd.ols.staging.mu.views.foo_bar.GET.200.response');
    });
  });
});
