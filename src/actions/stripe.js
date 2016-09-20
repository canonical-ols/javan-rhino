export const CREATE_STRIPE_TOKEN = 'CREATE_STRIPE_TOKEN';
export const CREATE_STRIPE_TOKEN_SUCCESS = 'CREATE_STRIPE_TOKEN_SUCCESS';
export const CREATE_STRIPE_TOKEN_FAILURE = 'CREATE_STRIPE_TOKEN_FAILURE';

export function createStripeToken(cardData) {
  return {
    type: CREATE_STRIPE_TOKEN,
    cardData
  };
}

export function createStripeTokenSuccess(token, response) {
  return {
    type: CREATE_STRIPE_TOKEN_SUCCESS,
    token,
    response
  };
}

export function createStripeTokenFailure(error) {
  return {
    type: CREATE_STRIPE_TOKEN_FAILURE,
    error
  };
}

/* global Stripe */
export function postCardData(cardData) {
  return (dispatch) => {

    dispatch(createStripeToken(cardData));

    Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

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
        dispatch(createStripeTokenSuccess(response.id, response));
      }
    });
  };
}
