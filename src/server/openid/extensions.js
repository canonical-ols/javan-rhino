export class Macaroons {
  constructor(cid) {
    this.requestParams = {
      'openid.ns.macaroon': 'http://ns.login.ubuntu.com/2016/openid-macaroon'
    };
    if (cid) {
      this.requestParams['openid.macaroon.caveat_id'] = cid;
    }
  }

  fillResult(params, result) {
    if (params['openid.macaroon.discharge']) {
      result['discharge'] = params['openid.macaroon.discharge'];
    }
  }
}
