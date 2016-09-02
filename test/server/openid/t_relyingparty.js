import expect from 'expect';
import conf from '../../../server/configure.js';
import RelyingParty from '../../../server/openid/relyingparty.js';

describe('RelyingParty', () => {
  let rp;

  before(() => {
    rp = RelyingParty();
  });

  it('should set verify url from config', () => {
    expect(rp.returnUrl).toEqual(conf.get('OPENID:VERIFY_URL'));
  });

  it('should set realm from config', () => {
    expect(rp.realm).toEqual(conf.get('OPENID:REALM'));
  });

  it('should not use stateless verification', () => {
    expect(rp.stateless).toBe(false);
  });

  it('should not use strict mode', () => {
    expect(rp.strict).toBe(false);
  });
});

describe('RelyingParty macaroon extension', () => {
  it('should not include macaroon extension if no cid passed as arg', () => {
    const rp = RelyingParty();

    expect(rp.extensions.find((x) => {
      return x.requestParams['openid.ns.macaroon'] === 'http://ns.login.ubuntu.com/2016/openid-macaroon';
    })).toNotExist();
  });
  it('should add macaroon extension if cid passed as arg', () => {
    const rp = RelyingParty('foo');

    expect(rp.extensions.find((x) => {
      return x.requestParams['openid.ns.macaroon'] === 'http://ns.login.ubuntu.com/2016/openid-macaroon';
    })).toExist();
  });
});
