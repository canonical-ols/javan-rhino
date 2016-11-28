import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { stub } from 'sinon';
import proxyquire from 'proxyquire';

import { SHOW_NOTIFICATION } from '../../../../../src/common/actions/notifications';

// load stripe actions module through proxyquire to stub postStripeToken calls
let postStripeTokenStub = stub();

const stripe = proxyquire(
  '../../../../../src/common/actions/stripe',
  {
    './customer': {
      postStripeToken: (token) => postStripeTokenStub(token)
    }
  }
);

const {
  createStripeToken,
  saveValidatedCardData,
  createStripeTokenSuccess,
  createStripeTokenFailure,
  postCardData
} = stripe;
const ActionTypes = stripe;

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('stripe actions', () => {

  context('createStripeToken', () => {

    it('should create an action to send card data to stripe', () => {
      const formCardData = { number: '424242424242' };
      const expectedAction = {
        type: ActionTypes.CREATE_STRIPE_TOKEN,
        formCardData
      };

      expect(createStripeToken(formCardData)).toEqual(expectedAction);
    });

  });

  context('saveValidatedCardData', () => {

    it('should create an action to store validated card data', () => {
      const validatedCardData = { last4: '4242' };
      const expectedAction = {
        type: ActionTypes.SAVE_VALIDATED_CARD_DATA,
        validatedCardData
      };

      expect(saveValidatedCardData(validatedCardData)).toEqual(expectedAction);
    });

  });

  context('createStripeTokenSuccess', () => {

    it('should create an action to successfully recieve token', () => {
      const token = 'token_4321';
      const expectedAction = {
        type: ActionTypes.CREATE_STRIPE_TOKEN_SUCCESS,
        token
      };

      expect(createStripeTokenSuccess(token)).toEqual(expectedAction);
    });

  });

  context('createStripeTokenFailure', () => {

    let error;
    let expectedActions;
    let store;

    beforeEach(() => {
      error = {
        message: 'foo'
      };
      expectedActions = [{
        type: SHOW_NOTIFICATION,
        notification: {
          message: error.message,
          status: 'error',
          actionText: 'Dismiss'
        }
      }, {
        type: ActionTypes.CREATE_STRIPE_TOKEN_FAILURE,
        error
      }];
      store = mockStore();
      store.dispatch(createStripeTokenFailure(error));
    });

    it('should return a thunk', () => {
      expect(createStripeTokenFailure()).toBeA(Function);
    });

    it('should create actions to handle failure response', () => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  context('postCardData', () => {
    const formCardData = { cardNumber: '424242424242' };

    let response;
    let store;
    let Stripe;

    before(() => {
      // mocking global Stripe that is used by postCardData
      GLOBAL.Stripe = Stripe = {
        setPublishableKey: stub(),
        card: {
          createToken: stub().callsArgWith(1, 200, response)
        }
      };
    });

    beforeEach(() => {
      store = mockStore({});
      postStripeTokenStub = stub().returns({ type: 'POST_STRIPE_TOKEN_TEST' });
    });

    context('on successful Stripe response', () => {
      beforeEach(() => {
        response = {
          id: 'token_4321',
          card: {
            last4: '4242'
          }
        };

        Stripe.card.createToken = stub().callsArgWith(1, 200, response);
        store.dispatch(postCardData(formCardData));
      });

      it('dispatches CREATE_STRIPE_TOKEN_SUCCESS action', () => {
        const expectedActions = [
          { type: ActionTypes.CREATE_STRIPE_TOKEN, formCardData },
          { type: ActionTypes.SAVE_VALIDATED_CARD_DATA, validatedCardData: response.card },
          { type: ActionTypes.CREATE_STRIPE_TOKEN_SUCCESS, token: response.id },
          { type: 'POST_STRIPE_TOKEN_TEST' }
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });

      it('calls postStripeToken action once', () => {
        expect(postStripeTokenStub.callCount).toBe(1);
      });

      it('calls postStripeToken action with token', () => {
        expect(postStripeTokenStub.alwaysCalledWithExactly(response.id)).toBe(true);
      });
    });

    context('on failure Stripe response', () => {
      beforeEach(() => {
        response = {
          error: {
            type: 'card_error',
            message: 'Test card error message'
          }
        };

        Stripe.card.createToken = stub().callsArgWith(1, 200, response);
        store.dispatch(postCardData(formCardData));
      });

      it('dispatches CREATE_STRIPE_TOKEN_FAILURE action', () => {
        expect(store.getActions()).toHaveActionOfType(ActionTypes.CREATE_STRIPE_TOKEN_FAILURE);
      });

      it('dispatches SHOW_NOTIFICATION action', () => {
        expect(store.getActions()).toHaveActionOfType(SHOW_NOTIFICATION);
      });
    });

    after(() => {
      delete GLOBAL.Stripe;
    });
  });

});
