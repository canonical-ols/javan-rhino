import * as ActionTypes from '../actions/identity';

export function identity(state = {
  isAuthenticated: false,
  name: null,
  email: null
}, action) {
  switch(action.type) {
    case ActionTypes.COMPLETE_LOGIN:
      return {
        isAuthenticated: action.isAuthenticated,
        name: action.name,
        email: action.email
      };
    default:
      return state;
  }
}
