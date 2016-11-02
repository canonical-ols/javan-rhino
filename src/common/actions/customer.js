import 'isomorphic-fetch';
import { showNotification } from './notifications';

import conf from '../config';

const MU_URL = conf.get('UNIVERSAL:MU_URL');

export const SEND_STRIPE_TOKEN = 'SEND_STRIPE_TOKEN';
export const SEND_STRIPE_TOKEN_SUCCESS = 'SEND_STRIPE_TOKEN_SUCCESS';
export const SEND_STRIPE_TOKEN_FAILURE = 'SEND_STRIPE_TOKEN_FAILURE';

export function sendStripeToken(token) {
  return {
    type: SEND_STRIPE_TOKEN,
    token
  };
}

export function sendStripeTokenSuccess(tosAccepted) {
  return (dispatch) => {
    dispatch({
      type: SEND_STRIPE_TOKEN_SUCCESS,
      tosAccepted
    });
  };
}

export function sendStripeTokenFailure(errors) {
  return (dispatch) => {
    dispatch(showNotification({
      message: [
        'There\'s been a problem adding your card.',
        'Please verify that card details you provided are correct or use a different card and try again.'
      ].join(' '),
      status: 'error',
      actionText: 'Dismiss'
    }));

    dispatch({
      type: SEND_STRIPE_TOKEN_FAILURE,
      errors
    });
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

    return fetch(`${MU_URL}/api/purchases/customers`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stripe_token: token
      })
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(json => dispatch(sendStripeTokenSuccess(json.latest_tos_accepted)))
      .catch(errors => dispatch(sendStripeTokenFailure(errors)));
  };
}
