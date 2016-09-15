import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  postStripeToken,
  sendStripeToken,
  sendStripeTokenSuccess,
  sendStripeTokenFailure
} from '../../../src/actions/customer';
import * as ActionTypes from '../../../src/actions/customer';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('customer actions', () => {
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

describe('async actions', () => {
  let token;
  let store;
  let scope;

  beforeEach(() => {
    token = 'my stripe token';
    store = mockStore({ tosAccepted: false });
    scope = nock('http://localhost:3000/');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SEND_STRIPE_TOKEN_SUCCESS when posting stripe token is successful', () => {
    const tosAccepted = '2016-09-12T10:16:20.779Z';

    scope.post('/api/purchases/customers')
      .reply(200, { tos_accepted: tosAccepted });

    const expectedActions = [
      { type: ActionTypes.SEND_STRIPE_TOKEN, token },
      { type: ActionTypes.SEND_STRIPE_TOKEN_SUCCESS, tosAccepted }
    ];

    return store.dispatch(postStripeToken(token))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates SEND_STRIPE_TOKEN_FAILURE when posting with invalid request', () => {
    const errors = {
      'code': 'AWFUL_ERROR'
    };

    scope.post('/api/purchases/customers')
      .replyWithError(errors);

    const expectedActions = [
      { type: ActionTypes.SEND_STRIPE_TOKEN, token },
      { type: ActionTypes.SEND_STRIPE_TOKEN_FAILURE, errors }
    ];

    return store.dispatch(postStripeToken(token))
      .then(() => {
        expect(store.getActions()).toMatch(expectedActions);
      });
  });
});
