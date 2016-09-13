export const requireAuthentication = (req, res, next) => {
  console.log(req.session);
  if (req.session.authenticated) {
    next();
  } else {
    res.status(401).send({
      'message': 'No session'
    });
  }
};

export const requireAuthorization = (req, res, next) => {
  console.log(req.session);
  if (req.session.authorization) {
    next();
  } else {
    res.status(403).send({
      'message': 'Missing macaroon authorization in session'
    });
  }
};
