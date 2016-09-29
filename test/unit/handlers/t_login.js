import expect from 'expect';
import { spy, stub } from 'sinon';
import { logout } from '../../../server/handlers/login.js';

describe('login handlers', () => {
  describe('logout handler', () => {

    // session.destroy stub
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
});
