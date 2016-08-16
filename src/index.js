// import global stylesheets before app renders
import './style/normalize.css';
import './style/base.css';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/app.js';

render(
  <App />,
  document.getElementById('content')
);
