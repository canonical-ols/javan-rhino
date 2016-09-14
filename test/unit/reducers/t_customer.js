import expect from 'expect';

import { customer } from '../../../src/reducers/customer';
import * as ActionTypes from '../../../src/actions/customer';

describe('customer reducers', () => {
  it('should return the initial state', () => {
    expect(customer(undefined, {})).toEqual({
      errors: false,
      isFetching: false,
      token: false,
      tosAccepted: false
    });
  });

  it('should add token to state', () => {
    const action = {
      type: ActionTypes.SEND_STRIPE_TOKEN,
      token: 'foo'
    };

    expect(customer({}, action)).toEqual({
      isFetching: true,
      token: 'foo'
    });
  });

  it('should handle failure', () => {
    const action = {
      type: ActionTypes.SEND_STRIPE_TOKEN_FAILURE,
      errors: []
    };

    expect(customer({}, action)).toEqual({
      isFetching: false,
      errors: []
    });
  });
});
