import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as identity from '../reducers/identity';
import * as customer from '../reducers/customer';
import * as stripe from '../reducers/stripe';

const rootReducer = combineReducers({
  ...identity,
  ...customer,
  ...stripe,
  routing: routerReducer
});

export default rootReducer;
