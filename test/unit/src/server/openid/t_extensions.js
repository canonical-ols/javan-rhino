import expect from 'expect';
import { Macaroons } from '../../../../../src/server/openid/extensions.js';

describe('Macaroons', () => {
  it('should have the sso macaroon namespace', () => {
    const macaroons = new Macaroons();

    expect(macaroons.requestParams).toEqual({
      'openid.ns.macaroon': 'http://ns.login.ubuntu.com/2016/openid-macaroon'
    });
  });

  it('should send caveat id', () => {
    const cid = 'foo';
    const macaroons = new Macaroons(cid);

    expect(macaroons.requestParams).toEqual({
      'openid.ns.macaroon': 'http://ns.login.ubuntu.com/2016/openid-macaroon',
      'openid.macaroon.caveat_id': cid
    });
  });

  it('should fill result caveat id', () => {
    const cid = 'foo';
    const macaroons = new Macaroons(cid);
    const params = {
      'openid.macaroon.discharge': cid
    };
    const result = {};

    macaroons.fillResult(params, result);

    expect(result).toEqual({ discharge: cid });
  });
});
