import expect from 'expect';

import { stripe } from '../../../src/reducers/stripe';
import * as ActionTypes from '../../../src/actions/stripe';

describe('stripe reducers', () => {

  const initialState = {
    isFetching: false,
    error: null,
    token: null,
    cardData: null,
    response: null
  };

  let action;

  it('should return the initial state', () => {
    expect(stripe(undefined, {})).toEqual(initialState);
  });

  context('on CREATE_STRIPE_TOKEN action', () => {

    beforeEach(() => {
      action = {
        type: ActionTypes.CREATE_STRIPE_TOKEN,
        cardData: {
          number: '432143214321',
          expiryDate: '12/21',
          securityNumber: '321'
        }
      };
    });

    it('should add card data to state', () => {
      expect(stripe(initialState, action)).toInclude({
        cardData: {
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
        token: 'test_token_0987654321',
        response: {
          id: 'test_token_0987654321',
          card: 'card data'
        }
      };
    });

    it('should add token to store', () => {
      expect(stripe({}, action)).toInclude({ token: 'test_token_0987654321' });
    });

    it('should add stripe response object to store', () => {
      expect(stripe({}, action)).toInclude({
        response: {
          id: 'test_token_0987654321',
          card: 'card data'
        }
      });
    });

    it('should mark fettching as false in state', () => {
      expect(stripe({}, action)).toInclude({ isFetching: false });
    });

  });

  context('on CREATE_STRIPE_TOKEN_SUCCESS action', () => {

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
