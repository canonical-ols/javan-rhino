// import global stylesheets before app renders
import './style/normalize.css';
import './style/base.css';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

const component = (
  <Router routes={routes} history={browserHistory} />
);

render(
  <Provider store={store} key="provider">
    { component }
  </Provider>,
  document.getElementById('content')
);
