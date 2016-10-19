import expect from 'expect';

import { stripe } from '../../../../../src/common/reducers/stripe';
import * as ActionTypes from '../../../../../src/common/actions/stripe';

describe('stripe reducers', () => {

  const initialState = {
    isFetching: false,
    error: null,
    token: null,
    formCardData: null,
    validatedCardData: null
  };

  let action;

  it('should return the initial state', () => {
    expect(stripe(undefined, {})).toEqual(initialState);
  });

  context('on CREATE_STRIPE_TOKEN action', () => {

    beforeEach(() => {
      action = {
        type: ActionTypes.CREATE_STRIPE_TOKEN,
        formCardData: {
          number: '432143214321',
          expiryDate: '12/21',
          securityNumber: '321'
        }
      };
    });

    it('should add card data to state', () => {
      expect(stripe(initialState, action)).toInclude({
        formCardData: {
          number: '432143214321',
          expiryDate: '12/21',
          securityNumber: '321'
        }
      });
    });

    it('should mark state as fetching', () => {
      expect(stripe(initialState, action)).toInclude({ isFetching: true });
    });

  });

  context('on CREATE_STRIPE_TOKEN_SUCCESS action', () => {

    beforeEach(() => {
      action = {
        type: ActionTypes.CREATE_STRIPE_TOKEN_SUCCESS,
        token: 'test_token_0987654321'
      };
    });

    it('should add token to store', () => {
      expect(stripe({}, action)).toInclude({ token: 'test_token_0987654321' });
    });

    it('should mark fetching as false in state', () => {
      expect(stripe({}, action)).toInclude({ isFetching: false });
    });

  });


  context('on SAVE_VALIDATED_CARD_DATA action', () => {

    beforeEach(() => {
      action = {
        type: ActionTypes.SAVE_VALIDATED_CARD_DATA,
        validatedCardData: {
          last4: '4321',
          country: 'US'
        }
      };
    });

    it('should add validated card data to store', () => {
      expect(stripe({}, action)).toInclude({
        validatedCardData: {
          last4: '4321',
          country: 'US'
        }
      });
    });

  });

  context('on CREATE_STRIPE_TOKEN_FAILURE action', () => {

    beforeEach(() => {
      action = {
        type: ActionTypes.CREATE_STRIPE_TOKEN_FAILURE,
        error: {
          type: 'card_error'
        }
      };
    });

    it('should add stripe error object to store', () => {
      expect(stripe({}, action)).toInclude({
        error: {
          type: 'card_error'
        }
      });
    });

    it('should mark fetching as false in state', () => {
      expect(stripe({}, action)).toInclude({ isFetching: false });
    });

  });

});
