// import global stylesheets before app renders
import './style/normalize.css';
import './style/base.css';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router routes={routes} history={history} />
);

render(
  <Provider store={store}>
    { component }
  </Provider>,
  document.getElementById('content')
);
