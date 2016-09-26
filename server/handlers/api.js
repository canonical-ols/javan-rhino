import request from 'request';
import conf from '../configure.js';

const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');

export const customers = (req, res) => {
  const auth = req.session.authorization;

  // FIXME:
  // send real requests when we don't need mocked ones anymore
  // const options = {
  //   uri: `${UBUNTU_SCA_URL}/purchases/v1/customers`,
  //   headers: {
  //     authorization: auth
  //   },
  //   json: true,
  //   body: {
  //     stripe_token: req.body.stripe_token
  //   }
  // };

  // request.post(options).pipe(res);

  // FIXME:
  // sending mocked responses until
  if (auth) {
    res.status(200).json({
      'accepted_tos_date': '2016-09-13T11:27:31+00:00',
      'latest_tos_date': '2016-09-09T12:00:00+00:00',
      'latest_tos_accepted': true,
      'has_payment_method': true
    });
  } else {
    res.status(401).json({
      'code': 'auth-required',
      'message': 'Authentication required.'
    });
  }
};

export const orders = (req, res) => {
  const auth = req.session.authorization;

  const options = {
    uri: `${UBUNTU_SCA_URL}/purchases/v1/orders`,
    headers: {
      authorization: auth
    },
    json: true,
    body: {
      'stripe_token': req.body.stripe_token
    }
  };

  request.post(options).pipe(res);
};
