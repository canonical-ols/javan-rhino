import conf from '../config';
import { postStripeToken } from './customer';
import { showNotification } from './notifications';

export const CREATE_STRIPE_TOKEN = 'CREATE_STRIPE_TOKEN';
export const SAVE_VALIDATED_CARD_DATA = 'SAVE_VALIDATED_CARD_DATA';
export const CREATE_STRIPE_TOKEN_SUCCESS = 'CREATE_STRIPE_TOKEN_SUCCESS';
export const CREATE_STRIPE_TOKEN_FAILURE = 'CREATE_STRIPE_TOKEN_FAILURE';

export function createStripeToken(formCardData) {
  return {
    type: CREATE_STRIPE_TOKEN,
    formCardData
  };
}

export function saveValidatedCardData(validatedCardData) {
  return {
    type: SAVE_VALIDATED_CARD_DATA,
    validatedCardData
  };
}

export function createStripeTokenSuccess(token) {
  return {
    type: CREATE_STRIPE_TOKEN_SUCCESS,
    token
  };
}

export function createStripeTokenFailure(error) {
  return (dispatch) => {
    dispatch(showNotification({
      message: error.message,
      status: 'error',
      actionText: 'Dismiss'
    }));

    dispatch({
      type: CREATE_STRIPE_TOKEN_FAILURE,
      error
    });
  };
}

/* global Stripe */
export function postCardData(cardData) {
  return (dispatch) => {

    dispatch(createStripeToken(cardData));

    Stripe.setPublishableKey(conf.get('UNIVERSAL:STRIPE_PUBLISHABLE_KEY'));

    Stripe.card.createToken({
      number: cardData.cardNumber,
      cvc: cardData.securityNumber,
      exp: cardData.expiryDate,

      name: cardData.name,
      address_line1: cardData.addressLine1,
      address_line2: cardData.addressLine2,
      address_city: cardData.city,
      address_state: cardData.state,
      address_zip: cardData.postcode,
      address_country: cardData.country
    }, (status, response) => {
      if (response.error) {
        dispatch(createStripeTokenFailure(response.error));
      } else {
        dispatch(saveValidatedCardData(response.card));
        dispatch(createStripeTokenSuccess(response.id));
        dispatch(postStripeToken(response.id));
      }
    });
  };
}
