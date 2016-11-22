import Express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import url from 'url';
import expressWinston from 'express-winston';
import chokidar from 'chokidar';
import raven from 'raven';
import lynx from 'lynx';
import responseTime from 'response-time';

import * as routes from './routes/';
import conf from './configure';
import sessionConfig from './helpers/session';
import logging from './logging';
import { clearRequireCache } from './helpers/hot-load';
import setRevisionHeader from './middleware/set-revision-header.js';

const appUrl = url.parse(conf.get('UNIVERSAL:MU_URL'));
const app = Express();
const logger = logging.getLogger('express');
const accessLogger = logging.getLogger('express-access');
const errorLogger = logging.getLogger('express-error');

const statsdDsn = conf.get('STATSD_DSN');

const { hostname, port, path } = url.parse(statsdDsn);

const metrics = new lynx(hostname, port, {
  scope: path,
  on_error: (err) => {
    logger.debug(err);
  }
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}
// FIXME sstewart 07-Nov-2016 simplify config for host and port
app.locals.host = conf.get('SERVER:HOST') || appUrl.hostname;
app.locals.port = conf.get('SERVER:PORT') || appUrl.port;

// middleware
app.use(setRevisionHeader);
app.use(raven.middleware.express.requestHandler(conf.get('SENTRY_DSN')));
app.use(expressWinston.logger({
  winstonInstance: accessLogger,
  level: 'info'
}));
app.use(helmet());
app.use(session(sessionConfig(conf)));
app.use(Express.static(__dirname + '/../public', { maxAge: '365d' }));
app.use(responseTime((req, res, time) => {
  const stat = (req.method + req.url).toLowerCase()
    .replace(/[:\.]/g, '')
    .replace(/\//g, '_');
  logger.info(stat, time);
  metrics.timing(stat, time);
}));

// routes
app.use('/', routes.login);
app.use('/api', routes.api);
app.use('/', routes.universal);

// FIXME sstewart 18-Nov-16 won't ever log because of
// https://github.com/canonical-ols/javan-rhino/issues/210
app.use(raven.middleware.express.errorHandler(conf.get('SENTRY_DSN')));
app.use(expressWinston.errorLogger({
  winstonInstance: errorLogger,
  level: 'info'
}));

if (process.env.NODE_ENV === 'development') {
  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch('./src');

  watcher.on('ready', function() {
    watcher.on('all', function() {
      clearRequireCache(/[\/\\]src[\/\\]/, require.cache);
    });
  });
}

export { app as default };
