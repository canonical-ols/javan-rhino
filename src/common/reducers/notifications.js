import * as ActionTypes from '../actions/notifications';

export function notifications(state = {
  notification: null
}, action) {
  switch(action.type) {
    case ActionTypes.SHOW_NOTIFICATION:
      return {
        notification: action.notification
      };
    case ActionTypes.DISMISS_NOTIFICATION:
      return {
        notification: null
      };
    default:
      return state;
  }
}
