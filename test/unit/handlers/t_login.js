import expect from 'expect';
import { spy, stub } from 'sinon';
import { logout } from '../../../server/handlers/login.js';

describe('login handler', () => {

  // session.destroy stub
  let req, res;

  beforeEach(() => {
    req = {
      session: {
        destroy: stub().callsArg(0)
      }
    };
    res = {
      send: spy(),
      redirect: spy()
    };
  });

  it('logout destroys session', () => {
    logout(req, res);
    expect(req.session.destroy.calledOnce).toBe(true);
  });

  it('happy path redirects to home', () => {
    req.session.destroy.callsArgWith(0, false);
    logout(req, res);
    expect(res.redirect.calledWith('/')).toBe(true);
  });

  it('sad path sends basic error message', () => {
    req.session.destroy.callsArgWith(0, true);
    logout(req, res);
    expect(res.send.calledWith('Logout failed')).toBe(true);
  });

});
