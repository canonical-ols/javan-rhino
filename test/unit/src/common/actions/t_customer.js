import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import conf from '../../../../../src/common/config';
import {
  postStripeToken,
  sendStripeToken,
  sendStripeTokenSuccess,
  sendStripeTokenFailure
} from '../../../../../src/common/actions/customer';
import * as ActionTypes from '../../../../../src/common/actions/customer';

const MU_URL = conf.get('UNIVERSAL:MU_URL');
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('customer actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      isFetching: false,
      tosAccepted: false,
      errors: false,
      token: false
    });
  });

  it('should create an action to send stripe token', () => {
    const token = 'stripe token';
    const expectedAction = {
      type: ActionTypes.SEND_STRIPE_TOKEN,
      token
    };

    store.dispatch(sendStripeToken(token));
    expect(store.getActions()).toInclude(expectedAction);
  });

  it('should create an action to receive success response', () => {
    const tosAccepted = 'date tos accepted';
    const expectedAction = {
      type: ActionTypes.SEND_STRIPE_TOKEN_SUCCESS,
      tosAccepted
    };

    store.dispatch(sendStripeTokenSuccess(tosAccepted));
    expect(store.getActions()).toInclude(expectedAction);
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

    store.dispatch(sendStripeTokenFailure(errors));
    expect(store.getActions()).toInclude(expectedAction);
  });
});

describe('async actions', () => {
  let token;
  let store;
  let scope;

  beforeEach(() => {
    scope = nock(MU_URL);
    token = 'my stripe token';
    store = mockStore({ tosAccepted: false });
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SEND_STRIPE_TOKEN_SUCCESS when posting stripe token is successful', () => {
    const tosAccepted = '2016-09-12T10:16:20.779Z';

    scope.post('/api/purchases/customers')
      .reply(200, { latest_tos_accepted: tosAccepted });

    return store.dispatch(postStripeToken(token))
      .then(() => {
        expect(store.getActions()).toHaveActionOfType(
          ActionTypes.SEND_STRIPE_TOKEN_SUCCESS
        );
      });
  });

  it('creates SEND_STRIPE_TOKEN_FAILURE when posting with invalid request', () => {
    const errors = {
      'code': 'AWFUL_ERROR'
    };

    scope.post('/api/purchases/customers')
      .replyWithError(errors);

    return store.dispatch(postStripeToken(token))
      .then(() => {
        expect(store.getActions()).toHaveActionOfType(
          ActionTypes.SEND_STRIPE_TOKEN_FAILURE
        );
      });
  });
});
