import React from 'react';
import { Route, Redirect } from 'react-router';
import App from './containers/app.js';
import AddCard from './containers/add-card.js';

export default (
  <Route component={App}>
    <Route path="/payment/edit" component={AddCard}/>
    <Redirect from="/" to="/payment/edit" />
  </Route>
);
