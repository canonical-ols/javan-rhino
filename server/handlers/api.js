import request from 'request';
import conf from '../configure.js';

export const customers = (req, res) => {
  const auth = req.session.authorization;

  const options = {
    uri: `${conf.get('UBUNTU_SCA:URL')}/purchases/customers`,
    headers: {
      authorization: auth
    }
  };

  request.post(options).pipe(res);
};

export const orders = (req, res) => {
  const auth = req.session.authorization;

  const options = {
    uri: `${conf.get('UBUNTU_SCA:URL')}/purchases/orders`,
    headers: {
      authorization: auth
    }
  };

  request.post(options).pipe(res);
};
