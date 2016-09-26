const NOTIFICATION_DURATION = 5000;

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const DISMISS_NOTIFICATION = 'DISMISS_NOTIFICATION';

export function showNotification(notification) {
  return (dispatch) => {
    if (!notification.action) {
      setTimeout(() => {
        dispatch(dismissNotification());
      }, NOTIFICATION_DURATION);
    }

    dispatch({
      type: SHOW_NOTIFICATION,
      notification
    });
  };
}

export function dismissNotification() {
  return {
    type: DISMISS_NOTIFICATION
  };
}
