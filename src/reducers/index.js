import * as ActionTypes from '../actions';
import { combineReducers } from 'redux';

// FIXME do we need this?
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

const rootReducer = combineReducers({
  authenticatedUser
});

export default rootReducer;
