import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as identity from '../reducers/identity';
import * as customer from '../reducers/customer';

const reducers = Object.assign(
  {},
  identity,
  customer
);

const rootReducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

export default rootReducer;
