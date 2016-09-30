import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import {
  showNotification,
  dismissNotification
} from '../../../src/actions/notifications';
import * as ActionTypes from '../../../src/actions/notifications';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Notification actions', () => {
  let notification;
  let store;
  let clock;

  beforeEach(() => {
    store = mockStore({
      notification: null
    });
  });

  context('and showNotification called without an action prop', () => {
    beforeEach(() => {
      clock = sinon.useFakeTimers();

      notification = {
        message: 'Notification message',
        status: 'success'
      };

      store.dispatch(showNotification(notification));
    });

    afterEach(() => {
      clock.restore();
    });

    it('should create an action to raise a notification', () => {
      expect(store.getActions()).toInclude({
        type: ActionTypes.SHOW_NOTIFICATION,
        notification
      });
    });

    it('should not immediately create an action to dismiss a notification', () => {
      expect(store.getActions()).toNotInclude({
        type: ActionTypes.DISMISS_NOTIFICATION
      });
    });

    context('and six seconds pass', () => {
      beforeEach(() => {
        clock.tick(6 * 1000);
      });

      it('should create an action to dismiss a notification', () => {
        expect(store.getActions()).toInclude({
          type: ActionTypes.DISMISS_NOTIFICATION
        });
      });
    });
  });

  context('and showNotification called with an action', () => {
    let clock;
    let actionCallback;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
      actionCallback = expect.createSpy();

      notification = {
        message: 'Notification message',
        status: 'success',
        action: actionCallback,
        actionText: 'Dismiss'
      };

      store.dispatch(showNotification(notification));
    });

    afterEach(() => {
      clock.restore();
    });

    context('and six seconds passes', () => {
      beforeEach(() => {
        clock.tick(6 * 1000);
      });

      it('should not automatically dismiss the notification', () => {
        expect(store.getActions()).toNotInclude({
          type: ActionTypes.DISMISS_NOTIFICATION
        });
      });
    });
  });

  context('and dismissNotification called', () => {
    beforeEach(() => {
      store.dispatch(dismissNotification());
    });

    it('should create an action to raise a notification', () => {
      expect(store.getActions()).toInclude({
        type: ActionTypes.DISMISS_NOTIFICATION,
      });
    });
  });
});
