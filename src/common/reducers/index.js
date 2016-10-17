import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as identity from '../reducers/identity';
import * as customer from '../reducers/customer';
import * as stripe from '../reducers/stripe';
import * as notifications from '../reducers/notifications';
import * as oyez from '../reducers/oyez';

const rootReducer = combineReducers({
  ...identity,
  ...customer,
  ...stripe,
  ...notifications,
  ...oyez,
  routing: routerReducer
});

export default rootReducer;
