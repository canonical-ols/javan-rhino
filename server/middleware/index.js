export const requireAuthentication = (req, res, next) => {
  if (!req.session.authenticated) {
    res.status(401).send({
      'message': 'No session'
    });
  }

  next();
};

export const requireAuthorization = (req, res, next) => {
  if (!req.session.authorization) {
    res.status(403).send({
      'message': 'Missing macaroon authorization in session'
    });
  }

  next();
};
