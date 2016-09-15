import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as identity from '../reducers/identity';
import * as customer from '../reducers/customer';

const rootReducer = combineReducers({
  ...identity,
  ...customer,
  routing: routerReducer
});

export default rootReducer;
