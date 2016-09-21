import Express from 'express';
import MongoConnect from 'connect-mongo';
import React from 'react';
import session from 'express-session';
import util from 'util';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import url from 'url';

import conf from './configure.js';
import login from './routes/login';
import api from './routes/api';
import routes from '../src/routes';
import Html from '../src/helpers/html';
import configureStore from '../src/store/configureStore';

const MongoStore = MongoConnect(session);
const sessionStore = new MongoStore({
  url: conf.get('DATABASE:URL')
});
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../logs/', 'access.log'),
  { flags: 'a' }
);


const app = Express();

app.use(morgan('combined', { stream: accessLogStream }));
app.use(session({
  secret: conf.get('DATABASE:SECRET'),
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use('/', login);
app.use('/api', api);

function serve(webpackIsomorphicTools) {
  app.use(Express.static(__dirname + '/../public'));
  app.use('/', function (req, res) {

    if (process.env.NODE_ENV !== 'production') {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {

        // FIXME sstewart 2016/09/09 defend against no session
        const isDev = (
          req.session &&
            req.session.teams &&
            req.session.teams.length
        );

        const initialState = {
          identity: {
            isAuthenticated: req.session.authenticated,
            isDev: isDev,
            name: req.session.name
          }
        };
        const store = configureStore(initialState);

        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        const component = <RouterContext {...renderProps} />;

        res.status(200);
        res.send('<!doctype html>\n' +
          renderToString(
            <Html
              assets={ webpackIsomorphicTools.assets() }
              store={ store }
              component={ component }
            />
          ));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  const appUrl = url.parse(conf.get('APP_URL'));
  const server = app.listen(appUrl.port, appUrl.hostname, () => {
    const host = server.address().address;
    const port = server.address().port;

    util.log('🚂  Express server listening on http://%s:%s 🚂', host, port);
  });
}

export { serve as default, app };
