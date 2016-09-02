import conf from '../configure.js';
import RelyingParty from '../openid/relyingparty.js';

let rp;

};

export const authenticate = (req, res) => {
  const identifier = conf.get('UBUNTU_SSO_URL');
  rp = RelyingParty();

  // Resolve identifier, associate, and build authentication URL
  rp.authenticate(identifier, false, (error, authUrl) => {
    if (error) {
      // TODO auth failure view
      res.send('Authentication failed: ' + error.message);
    }
    else if (!authUrl) {
      // TODO auth failure view
      res.send('Authentication failed');
    }
    else {
      res.redirect(authUrl);
    }
  });
};

export const verify = (req, res) => {
  rp.verifyAssertion(req, (error, result) => {
    // TODO handle error
    if (!error) {
      req.session.name = result.fullname;
      req.session.teams = result.teams;
      res.redirect('/');
    } else {
      res.send('Authentication failed: ' + error.message);
    }
  });
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      // TODO handle error
    }
    res.redirect('/');
  });
};
