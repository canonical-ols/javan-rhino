module.exports = {
  UNIVERSAL: {
    MU_URL: 'http://localhost:3000',
    STRIPE_PUBLISHABLE_KEY: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh'
  },
  SERVER: {
    UBUNTU_SSO_URL: 'https://login.staging.ubuntu.com',
    UBUNTU_SCA_URL: 'https://myapps.developer.staging.ubuntu.com',
    WEBPACK_DEV_URL: 'http://localhost:3001',
    OPENID: {
      VERIFY_URL: 'http://localhost:3000/login/verify',
      TEAMS: [
        'ubuntuone-hackers'
      ]
    }
  }
};
