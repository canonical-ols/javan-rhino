const constants = {
  E_GET_MACAROON_FAIL: 'Authentication failed: Macaroon service returned bad status. Please try again in a few minutes. Sorry.',
  E_GET_MACAROON_UNDEF: 'Authentication failed: Macaroon service did not return a macaroon. Please try again in a few minutes. Sorry.',
  E_AUTHENTICATION_FAIL: 'Authentication failed',
  E_SSO_FAIL: 'Sorry, Ubuntu One failed to authenticate you, please try signing in again.',
  E_SSO_DISCHARGE_FAIL: 'Sorry, Ubuntu One failed to return a valid discharge macaroon, please try signing in again, ensuring the service authorization item is checked',
  E_LOGOUT_FAIL: 'Logout failed.',
  E_NO_SESSION: 'No session.',
  E_NO_SESSION_MACAROON: 'No session macaroon.'
};

export default constants;
