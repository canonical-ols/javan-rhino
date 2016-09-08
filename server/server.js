import Express from 'express';
import MongoConnect from 'connect-mongo';
import React from 'react';
import { createStore } from 'redux';
import session from 'express-session';
import util from 'util';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import reducers from '../src/redux/';
import conf from './configure.js';
import login from './routes/login';
import routes from '../src/routes';
import Html from '../src/helpers/html';

const MongoStore = MongoConnect(session);
const sessionStore = new MongoStore({
  url: conf.get('DATABASE:URL')
});

const app = Express();

app.use(session({
  secret: conf.get('DATABASE:SECRET'),
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use('/', login);

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
        const store = createStore(reducers);

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
              component={ component } />
          ));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  const server = app.listen(conf.get('APP:PORT'), conf.get('APP:HOST'), () => {
    const host = server.address().address;
    const port = server.address().port;

    util.log('🚂  Express server listening on http://%s:%s 🚂', host, port);
  });
}

export { serve as default, app };
