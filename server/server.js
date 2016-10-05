import Express from 'express';
import React from 'react';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import url from 'url';
import util from 'util';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import Html from '../src/helpers/html';
import api from './routes/api';
import conf from './configure.js';
import configureStore from '../src/store/configureStore';
import login from './routes/login';
import routes from '../src/routes';
import sessionConfig from './helpers/session';

const logsPath = conf.get('SERVER:LOGS_PATH') || path.join(__dirname, '../logs/');
const accessLogStream = fs.createWriteStream(
  path.join(logsPath, 'access.log'),
  { flags: 'a' }
);

const app = Express();

app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));

app.use(session(sessionConfig(conf)));

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}

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

        const initialState = {};

        if (req.session) {

          if (req.session.authenticated) {
            initialState['identity'] = {
              isAuthenticated: req.session.authenticated,
              name: req.session.name,
              email: req.session.email
            };
          }


          if (req.session.error) {
            initialState['oyez'] = [{
              'message': req.session.error,
              'status': 'error'
            }];

            delete req.session.error;
          }

        }


        const store = configureStore(initialState);

        // config we share from server side to client side
        const config = {
          UNIVERSAL: conf.get('UNIVERSAL')
        };

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
              config={ config }
            />
          ));
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  const appUrl = url.parse(conf.get('UNIVERSAL:MU_URL'));
  const appHost = conf.get('SERVER:HOST') || appUrl.hostname;
  const appPort = conf.get('SERVER:PORT') || appUrl.port;
  const server = app.listen(appPort, appHost, () => {
    const host = server.address().address;
    const port = server.address().port;

    util.log('🚂  Express server listening on http://%s:%s 🚂', host, port);
  });
}

export { serve as default, app };
