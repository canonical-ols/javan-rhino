import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';

import routes from './routes';
import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router routes={routes} history={history} />
);

history.listen((location) => {
  const ga = window.ga;
  if (ga) {
    ga('send', {
      hitType: 'pageview',
      page: location.pathname
    });
  }
});

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        { component }
      </Provider>
    );
  }
}

export default hot(module)(Root);
