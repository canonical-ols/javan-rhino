import * as ActionTypes from '../actions/stripe';

export function stripe(state = {
  isFetching: false,
  error: null,
  token: null,
  cardData: null,
  response: null
}, action) {
  switch(action.type) {
    case ActionTypes.CREATE_STRIPE_TOKEN:
      return {
        ...state,
        isFetching: true,
        cardData: action.cardData
      };
    case ActionTypes.CREATE_STRIPE_TOKEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        token: action.token,
        response: action.response
      };
    case ActionTypes.CREATE_STRIPE_TOKEN_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}
