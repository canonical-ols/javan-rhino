import expect from 'expect';
import {
  sendStripeToken,
  sendStripeTokenSuccess,
  sendStripeTokenFailure
} from '../../../src/actions/';
import * as ActionTypes from '../../../src/actions/';

describe('actions', () => {
  it('should create an action to send stripe token', () => {
    const token = 'stripe token';
    const expectedAction = {
      type: ActionTypes.SEND_STRIPE_TOKEN,
      token
    };

    expect(sendStripeToken(token)).toEqual(expectedAction);
  });

  it('should create an action to receive success response', () => {
    const tosAccepted = 'date tos accepted';
    const expectedAction = {
      type: ActionTypes.SEND_STRIPE_TOKEN_SUCCESS,
      tosAccepted
    };

    expect(sendStripeTokenSuccess(tosAccepted)).toEqual(expectedAction);
  });

  it('should create an action to receive failure response', () => {
    const errors = {
      'error_list': [
        { 'message':'Request failed.','code':'request-failed' }
      ]
    } ;
    const expectedAction = {
      type: ActionTypes.SEND_STRIPE_TOKEN_FAILURE,
      errors
    };

    expect(sendStripeTokenFailure(errors)).toEqual(expectedAction);
  });

});
