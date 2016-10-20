import expect from 'expect';
import conf from '../../../../../src/server/configure.js';
import RelyingPartyFactory, {
  saveAssociation,
  loadAssociation,
  removeAssociation
} from '../../../../../src/server/openid/relyingparty.js';

const VERIFY_URL = conf.get('SERVER:OPENID:VERIFY_URL');
const MU_URL = conf.get('UNIVERSAL:MU_URL');

describe('RelyingParty', () => {
  let rp;

  before(() => {
    rp = RelyingPartyFactory({});
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
    rp = RelyingPartyFactory({});
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
    rp = RelyingPartyFactory({
      cid: 'my macaroon'
    });
  });

  it('should add macaroon extension if cid passed as arg', () => {
    expect(rp.extensions.find((x) => {
      return x.requestParams['openid.ns.macaroon'] === 'http://ns.login.ubuntu.com/2016/openid-macaroon';
    })).toExist();
  });
});

describe('RelyingParty saveAssociation', () => {

  let mySaveAssociation;
  let mySession = {};

  before(() => {
    mySaveAssociation = saveAssociation(mySession);
  });

  it('should return a function', () => {
    expect(mySaveAssociation).toBeA(Function);
  });

  describe('session association', () => {
    let provider = 'foo';
    let type = 'bar';
    let handle = 'baz';
    let secret = 'qux';


    before(() => {
      mySaveAssociation(provider, type, handle, secret, 1, () => {});
    });

    it('should exist on session', () => {
      expect(mySession.association).toEqual({
        provider,
        type,
        secret
      });
    });
  });
});

describe('RelyingParty loadAssociation', () => {

  let myLoadAssociation;
  let mySession = {
    association: 'foo'
  };
  let spy;

  before(() => {
    myLoadAssociation = loadAssociation(mySession);
    spy = expect.createSpy();
  });

  it('should return a function', () => {
    expect(myLoadAssociation).toBeA(Function);
  });

  describe('session association', () => {
    before(() => {
      myLoadAssociation(null, spy);
    });

    it('should callback with session association', () => {
      expect(spy).toHaveBeenCalledWith(null, 'foo');
    });
  });
});

describe('RelyingParty removeAssociation', () => {
  let myRemoveAssociation;
  let mySession = {};

  before(() => {
    myRemoveAssociation = removeAssociation(mySession);
  });

  it('should return a function', () => {
    expect(myRemoveAssociation).toBeA(Function);
  });

  it('should delete session association', () => {
    myRemoveAssociation();
    expect(mySession).toEqual({});
  });
});
