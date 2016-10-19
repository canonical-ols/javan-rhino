import expect from 'expect';
import conf from '../../../../../src/server/configure.js';
import RelyingParty from '../../../../../src/server/openid/relyingparty.js';

const VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');
const MU_URL = conf.get('UNIVERSAL:MU_URL');

describe('RelyingParty', () => {
  let rp;

  before(() => {
    rp = RelyingParty();
  });

  it('should set verify url from config', () => {
    expect(rp.returnUrl).toBe(VERIFY_URL);
  });

  it('should set realm from config', () => {
    expect(rp.realm).toBe(MU_URL);
  });

  it('should not use stateless verification', () => {
    expect(rp.stateless).toBe(false);
  });

  it('should not use strict mode', () => {
    expect(rp.strict).toBe(false);
  });
});

describe('RelyingParty default extensions', () => {
  let rp;

  before(() => {
    rp = RelyingParty();
  });

  it('should not include macaroon extension if no cid passed as arg', () => {
    expect(rp.extensions.find((x) => {
      return x.requestParams['openid.ns.macaroon'] === 'http://ns.login.ubuntu.com/2016/openid-macaroon';
    })).toNotExist();
  });
});

describe('RelyingParty with macaroon extension', () => {
  let rp;

  before(() => {
    rp = RelyingParty('foo');
  });

  it('should add macaroon extension if cid passed as arg', () => {
    expect(rp.extensions.find((x) => {
      return x.requestParams['openid.ns.macaroon'] === 'http://ns.login.ubuntu.com/2016/openid-macaroon';
    })).toExist();
  });
});
