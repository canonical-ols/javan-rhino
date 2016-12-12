import AddCard from './containers/add-card.js';
import App from './containers/app.js';
import React from 'react';
import TermsOfService from './containers/terms.js';
import { Route, Redirect } from 'react-router';

export default (
  <Route component={App}>
    <Route path="/payment/edit" component={AddCard}/>
    <Route path="/terms" component={TermsOfService}/>
    <Redirect from="/" to="/payment/edit" />
  </Route>
);
