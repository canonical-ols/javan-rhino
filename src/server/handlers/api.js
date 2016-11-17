import raven from 'raven';
import request from 'request';
import conf from '../configure.js';

const UBUNTU_SCA_URL = conf.get('SERVER:UBUNTU_SCA_URL');

const client = new raven.Client(conf.get('SENTRY_DSN'));

export const customers = (req, res) => {
  const auth = req.session.authorization;

  const options = {
    uri: `${UBUNTU_SCA_URL}/purchases/v1/customers`,
    headers: {
      authorization: auth
    },
    json: true,
    body: {
      stripe_token: req.body.stripe_token
    }
  };

  request.post(options, (err, res, body) => {
    if (err) {
      client.captureError(err);
    }

    if (body && !body.latest_tos_accepted) {
      client.captureMessage('latest_tos_accepted is false', { extra: body });
    }
  }).pipe(res);

};
