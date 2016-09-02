import expect, { createSpy } from 'expect';
import RelyingParty from '../../server/openid/relyingparty.js';
import {
  logout,
  _authenticate,
  _verify
} from '../../server/handlers/login.js';

describe('login handler', () => {

  describe('_authenticate', () => {

    it('should call rp.authenticate', () => {
      const rp = RelyingParty();
      const identifier = 'xxx';
      const res = {
        send: () => {},
        redirect: () => {},
      };
      const spy = expect.spyOn(rp, 'authenticate');

      _authenticate(rp, identifier, res);
      expect(spy).toHaveBeenCalled();
    });

  });

  describe('_verify', () => {

    it('should call rp.verifyAssertion', () => {
      const rp = RelyingParty();
      const spy = expect.spyOn(rp, 'verifyAssertion');

      _verify(rp);
      expect(spy).toHaveBeenCalled();
    });

  });

  it('logout destroys session', () => {
    const spy = createSpy();
    const req = {
      session: {
        destroy: spy
      }
    };
    const res = {};

    logout(req, res);

    expect(spy.calls.length).toEqual(1);
    expect(spy).toHaveBeenCalled();
  });

  it('logout redirects to home if destroy successful', () => {
    const req = {
      session: {
        destroy: (cb) => {
          cb();
        }
      }
    };
    const res = {};
    const spy = createSpy();
    res.redirect = spy;

    logout(req, res);

    expect(spy.calls.length).toEqual(1);
    expect(spy).toHaveBeenCalledWith('/');
  });

});
