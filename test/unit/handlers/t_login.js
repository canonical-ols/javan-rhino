import expect from 'expect';
import { spy, stub } from 'sinon';
import {
  logout,
  errorHandler
} from '../../../server/handlers/login.js';

describe('login', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      session: {
        destroy: stub().callsArg(0)
      }
    };
    res = {
      send: spy(),
      redirect: spy()
    },
      next = spy();
  });

  describe('logout handler', () => {

    it('destroys session', () => {
      logout(req, res, next);
      expect(req.session.destroy.calledOnce).toBe(true);
    });

    it('on success redirects to home', () => {
      req.session.destroy.callsArgWith(0, false);
      logout(req, res, next);
      expect(res.redirect.calledWith('/')).toBe(true);
    });

    it('on error calls next with error', () => {
      req.session.destroy.callsArgWith(0, true);
      logout(req, res, next);
      expect(next.calledWith(new Error())).toBe(true);
    });

  });

  describe('error handler', () => {

    it('should put error message on session error prop', () => {
      const message = 'abcdef';
      errorHandler(new Error(message), req, res, next);
      expect(req.session.error).toBe(message);
    });

  });
});
