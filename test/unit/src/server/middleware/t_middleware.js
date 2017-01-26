import sinon, { stub } from 'sinon';

import {
  requireAuthentication,
  requireAuthorization
} from '../../../../../src/server/middleware';

describe('auth middleware', () => {

  let req;
  let res;
  let next;

  beforeEach(() => {
    const send = stub();
    const status = stub();
    status.returns({ send });

    req = {
      session: {
        authenticated: undefined,
        authorization: undefined
      }
    };
    res = {
      send,
      status
    };
    next = stub();
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      req.session.authenticated = true;
      requireAuthentication(req, res, next);
    });
    it('should call next callback', () => {
      sinon.assert.calledOnce(next);
    });
  });

  describe('when unauthenticated', () => {
    beforeEach(() => {
      req.session.authenticated = false;
      requireAuthentication(req, res, next);
    });

    it('should not call next callback', () => {
      sinon.assert.notCalled(next);
    });

    it('should call status with 401', () => {
      sinon.assert.calledWith(res.status, 401);
    });

    it('should call send with message', () => {
      sinon.assert.calledWith(res.send, {
        'message': 'No session'
      });
    });
  });

  describe('has macaroon header', () => {
    beforeEach(() => {
      req.session.authorization = true;
      requireAuthorization(req, res, next);
    });

    it('should call next callback', () => {
      sinon.assert.calledOnce(next);
    });
  });

  describe('no macaroon header', () => {
    beforeEach(() => {
      req.session.authorization = false;
      requireAuthorization(req, res, next);
    });

    it('should not call next callback', () => {
      sinon.assert.notCalled(next);
    });

    it('should call status with 403', () => {
      sinon.assert.calledWith(res.status, 403);
    });

    it('should call send with message', () => {
      sinon.assert.calledWith(res.send, {
        'message': 'Missing macaroon authorization in session'
      });
    });
  });
});
