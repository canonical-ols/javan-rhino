import request from 'request';
import { extractCaveatId, formatMacaroonAuthHeader } from '../macaroons';
import conf from '../configure.js';
import RelyingParty from '../openid/relyingparty.js';

let rp;
const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');
const OPENID_IDENTIFIER = conf.get('SERVER:UBUNTU_SSO_URL');

export const getMacaroon = (req, res, next) => {
  const options = {
    url: `${UBUNTU_SCA_URL}/dev/api/acl/`,
    method: 'POST',
    json: {
      'permissions': ['package_access', 'package_purchase']
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      return next(error);
    }

    if (!body.macaroon) {
      return next(new Error('getMacaroon: No macaroon on response body.'))
    }

    req.session.macaroon = body.macaroon;
    req.session.cid = extractCaveatId(body.macaroon);
    next();
  });
};

export const authenticate = (req, res) => {
  rp = RelyingParty(req.session.cid);

  rp.authenticate(OPENID_IDENTIFIER, false, (error, authUrl) => {
    if (error) {
      return next(new Error('Authentication failed: ' + error.message));
    }
    else if (!authUrl) {
      return next(new Error('Authentication failed'));
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
      return next(new Error('Authentication failed: ' + error.message));
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return next(new Error('Logout failed.'));
    }
    res.redirect('/');
  });
};

export const errorHandler = (err, req, res, next) => {
  if (req.session) {
    req.session.error = err.message;
  }
  res.redirect('/');
}
