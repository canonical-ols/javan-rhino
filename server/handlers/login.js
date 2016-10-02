import request from 'request';
import { extractCaveatId, formatMacaroonAuthHeader } from '../macaroons';
import conf from '../configure.js';
import RelyingParty from '../openid/relyingparty.js';

let rp;
const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');
const OPENID_IDENTIFIER = conf.get('SERVER:UBUNTU_SSO_URL');

export const getMacaroon = (req, res, next) => {
  // get macaroon from store
  // store on req
  //
  const options = {
    url: `${UBUNTU_SCA_URL}/dev/api/acl/`,
    method: 'POST',
    json: {
      'permissions': ['package_access', 'package_purchase']
    }
  };

  request(options, (error, response, body) => {
    if (error || !body.macaroon) {
      const errors = req.session.errors || [];
      errors.push({
        'code': 'request-failed',
        'message': 'Get macaroon request failed.'
      });
      req.session.errors = errors;
      res.redirect('/');
    } else {
      req.session.macaroon = body.macaroon;
      req.session.cid = extractCaveatId(body.macaroon);
      next();
    }
  });
};

export const authenticate = (req, res) => {
  rp = RelyingParty(req.session.cid);

  rp.authenticate(OPENID_IDENTIFIER, false, (error, authUrl) => {
    if (error) {
      // TODO auth failure view
      res.status(401).send('Authentication failed: ' + error.message);
    }
    else if (!authUrl) {
      // TODO auth failure view
      res.status(401).send('Authentication failed');
    }
    else {
      res.redirect(authUrl);
    }
  });
};

export const verify = (req, res) => {
  rp.verifyAssertion(req, (error, result) => {
    // TODO handle error
    if (!error && result.authenticated) {
      req.session.authenticated = result.authenticated;
      req.session.name = result.fullname;
      req.session.email = result.email;
      req.session.teams = result.teams;
      req.session.authorization = formatMacaroonAuthHeader(req.session.macaroon, result.discharge);
      res.redirect('/');
    } else {
      res.status(401).send('Authentication failed: ' + error.message);
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // TODO handle logout failure
      res.send('Logout failed');
    }
    res.redirect('/');
  });
};
