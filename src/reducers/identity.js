import * as ActionTypes from '../actions/identity';

export function identity(state = {
  isAuthenticated: false,
  isDev: false,
  name: undefined,
  errors: null,
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
