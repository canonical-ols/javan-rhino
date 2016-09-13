import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as ActionTypes from '../actions';

function authenticatedUser(state = {
  isAuthenticated: false,
  isDev: false,
  name: undefined
}, action) {
  switch(action.type) {
    case ActionTypes.COMPLETE_LOGIN:
      return {
        isAuthenticated: action.isAuthenticated,
        isDev: action.isDev,
        name
      };
    default:
      return state;
  }
}

function sendStripeToken(state = { isFetching: false }, action) {
  switch(action.type) {
    case ActionTypes.SEND_STRIPE_TOKEN:
      return {
        isFetching: true,
        token: action.token
      };
    case ActionTypes.SEND_STRIPE_TOKEN_SUCCESS:
      return {
        isFetching: false,
        tosAccepted: action.tosAccepted
      };
    case ActionTypes.SEND_STRIPE_TOKEN_FAILURE:
      return {
        isFetching: false,
        errors: action.errors
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  routing,
  sendStripeToken,
  authenticatedUser
});

export default rootReducer;
