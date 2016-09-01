import expect, { createSpy } from 'expect';
import qs from 'qs';
import conf from '../../server/configure.js';
import { logout, createRelyingParty } from '../../server/handlers/login.js';

describe('relying party', () => {
  const rp = createRelyingParty();
  const identifier = conf.get('UBUNTU_SSO_URL');

  describe('authenticate method', () => {
    it('should fail with wrong identifier', () => {
      rp.authenticate('http://example.com', false, (error) => {
        expect(error).toEqual({
          message:
            'No providers found for the given identifier'
        });
      });
    });

    describe('authUrl query string', () => {
      it('should have the correct realm', () => {
        rp.authenticate(identifier, false, (error, authUrl) => {
          const query = qs.parse(authUrl);
          expect(error).toEqual(null);
          expect(query['openid.realm']).toEqual(conf.get('OPENID:REALM'));
        });
      });

      it('should have the correct profile', () => {
        rp.authenticate(identifier, false, (error, authUrl) => {
          const query = qs.parse(authUrl);
          expect(query['openid.sreg.optional']).toEqual('nickname,email,fullname,language');
        });
      });

      it('should have the correct return to url', () => {
        rp.authenticate(identifier, false, (error, authUrl) => {
          const query = qs.parse(authUrl);
          expect(query['openid.return_to']).toEqual(conf.get('OPENID:VERIFY_URL'));
        });
      });
    });
  });
});

describe('login handlers', () => {

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
