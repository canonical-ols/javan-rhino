import * as ActionTypes from '../actions/customer';

export function customer(state = {
  isFetching: false,
  tosAccepted: false,
  errors: false,
  token: false
}, action) {
  switch(action.type) {
    case ActionTypes.SEND_STRIPE_TOKEN:
      return Object.assign({}, state, {
        isFetching: true,
        token: action.token
      });
    case ActionTypes.SEND_STRIPE_TOKEN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        tosAccepted: action.tosAccepted
      });
    case ActionTypes.SEND_STRIPE_TOKEN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors
      });
    default:
      return state;
  }
}
