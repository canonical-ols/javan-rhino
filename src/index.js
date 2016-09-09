// import global stylesheets before app renders
import './style/normalize.css';
import './style/base.css';

import 'babel-polyfill';
import React from 'react';
import { createStore } from 'redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import reducers from './redux/';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducers, preloadedState);

const component = (
  <Router routes={routes} history={browserHistory} />
);

render(
  <Provider store={store} key="provider">
    { component }
  </Provider>,
  document.getElementById('content')
);
