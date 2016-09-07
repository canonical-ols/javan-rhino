import expect from 'expect';
import { spy, stub } from 'sinon';
import { logout } from '../../server/handlers/login.js';

describe('login handler', () => {

  // session.destroy stub
  let destroy;

  const req = {
    session: {
      destroy: () => {}
    }
  };
  const res = {
    send: () => {},
    redirect: () => {}
  };

  beforeEach(() => {
    destroy = stub(req.session, 'destroy')
      .callsArg(0);
    spy(res, 'redirect');
    spy(res, 'send');
  });

  afterEach(() => {
    req.session.destroy.restore();
    res.redirect.restore();
    res.send.restore();
  });

  it('logout destroys session', () => {
    logout(req, res);
    expect(req.session.destroy.calledOnce).toBe(true);
  });

  it('happy path redirects to home', () => {
    destroy.callsArgWith(0, false);
    logout(req, res);
    expect(res.redirect.calledWith('/')).toBe(true);
  });

  it('sad path sends basic error message', () => {
    destroy.callsArgWith(0, true);
    logout(req, res);
    expect(res.send.calledWith('Logout failed')).toBe(true);
  });

});
