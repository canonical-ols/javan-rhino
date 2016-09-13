import 'whatwg-fetch';

export const COMPLETE_LOGIN = 'COMPLETE_LOGIN';

export function authenticateUser(isAuthenticated, isDev, name) {
  return {
    type: COMPLETE_LOGIN,
    isAuthenticated,
    isDev,
    name
  };
}

export const SEND_STRIPE_TOKEN = 'SEND_STRIPE_TOKEN';

export function sendStripeToken(token) {
  return {
    type: SEND_STRIPE_TOKEN,
    token
  };
}

export const SEND_STRIPE_TOKEN_SUCCESS = 'SEND_STRIPE_TOKEN_SUCCESS';
export const SEND_STRIPE_TOKEN_FAILURE= 'SEND_STRIPE_TOKEN_FAILURE';

export function sendStripeTokenSuccess(json) {
  return {
    type: SEND_STRIPE_TOKEN_SUCCESS,
    tos_accepted: json.tos_accepted
  };
}

export function sendStripeTokenFailure(errors) {
  return {
    type: SEND_STRIPE_TOKEN_FAILURE,
    errors
  };
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * POST a customer record for the user in Ubuntu Pay
 * @arg {string} token stripe token
 */
export function postStripeToken(token) {
  return (dispatch) => {
    dispatch(sendStripeToken(token));

    // TODO try-sandbox :(
    return fetch('/api/purchases/customers', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        stripe_token: token
      })
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(sendStripeTokenSuccess(json)))
      .catch(errors => dispatch(sendStripeTokenFailure(errors)));
  };
}
