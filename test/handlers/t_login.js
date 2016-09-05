import expect, { createSpy } from 'expect';
import { logout } from '../../server/handlers/login.js';

describe('login handler', () => {

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
