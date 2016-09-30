module.exports = {
  UNIVERSAL: {
    MU_URL: 'https://my.ubuntu.com',
    STRIPE_PUBLISHABLE_KEY: 'pk_test_daBepdMharNP0PTQYoyQJPjH'
  },
  SERVER: {
    HOST: '0.0.0.0',
    PORT: 8000,
    UBUNTU_SSO_URL: 'https://login.ubuntu.com',
    UBUNTU_SCA_URL: 'https://myapps.developer.ubuntu.com',
    OPENID: {
      VERIFY_URL: 'https://my.ubuntu.com/login/verify',
      TEAMS: [
        'ubuntuone-hackers'
      ]
    }
  }
};
