import request from 'request';
import { extractCaveatId, formatMacaroonAuthHeader } from '../macaroons';
import conf from '../configure.js';
import RelyingParty from '../openid/relyingparty.js';
import * as constants from '../constants';

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
      // TODO log errors
      return next(new Error(constants.E_GET_MACAROON_FAILURE));
    }

    req.session.macaroon = body.macaroon;
    req.session.cid = extractCaveatId(body.macaroon);
    next();
  });
};

export const authenticate = (req, res, next) => {
  rp = RelyingParty(req.session.cid);

  // TODO log errors
  rp.authenticate(OPENID_IDENTIFIER, false, (error, authUrl) => {
    if (error) {
      return next(new Error(`${constants.E_AUTHENTICATION_FAILED}: ${error.message}`));
    }
    else if (!authUrl) {
      return next(new Error(constants.E_AUTHENTICATION_FAILED));
    }
    else {
      res.redirect(authUrl);
    }
  });
};

export const verify = (req, res, next) => {
  rp.verifyAssertion(req, (error, result) => {
    if (!error && result.authenticated) {
      req.session.authenticated = result.authenticated;
      req.session.name = result.fullname;
      req.session.email = result.email;
      req.session.teams = result.teams;
      req.session.authorization = formatMacaroonAuthHeader(req.session.macaroon, result.discharge);
      // FIXME redirect to page that initiated the sign in request
      res.redirect('/');
    } else {
      // TODO log errors
      return next(new Error(`${constants.E_AUTHENTICATION_FAILED}: ${error.message}`));
    }
  });
};

export const logout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      // TODO log errors
      return next(new Error(constants.E_LOGOUT_FAILED));
    }
    // FIXME redirect to page that initiated the sign in request
    res.redirect('/');
  });
};

export const errorHandler = (err, req, res, next) => {
  if (req.session) {
    req.session.error = err.message;
  }
  // FIXME redirect to page that initiated the sign in request
  res.redirect('/');
}
