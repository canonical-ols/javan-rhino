module.exports = {
  APP: {
    PORT: 3000,
    HOST: 'localhost'
  },
  OPENID: {
    VERIFY_URL: 'http://localhost:3000/login/verify',
    REALM: 'http://localhost:3000',
    TEAMS: [
      'ubuntuone-hackers'
    ]
  },
  DATABASE: {
    URL: 'mongodb://localhost/javan-rhino',
    SECRET: 'javan rhino'
  },
  UBUNTU_SSO_HOST: 'login.staging.ubuntu.com',
  UBUNTU_SSO_URL: 'https://login.staging.ubuntu.com',
  UBUNTU_SCA: {
    URL: 'https://myapps.developer.staging.ubuntu.com'
  }
};
