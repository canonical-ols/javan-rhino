import Express from 'express';
import helmet from 'helmet';
import session from 'express-session';
import url from 'url';
import expressWinston from 'express-winston';

import * as routes from './routes/';
import conf from './configure';
import sessionConfig from './helpers/session';
import logging from './logging';

const appUrl = url.parse(conf.get('UNIVERSAL:MU_URL'));
const app = Express();
const logger = logging.getLogger('app');

app.use(expressWinston.logger({
  winstonInstance: logger
}));

// config
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}
// FIXME sstewart 07-Nov-2016 simplify config to host and port
app.locals.host = conf.get('SERVER:HOST') || appUrl.hostname;
app.locals.port = conf.get('SERVER:PORT') || appUrl.port;

// middleware
app.use(helmet());
app.use(session(sessionConfig(conf)));
app.use(Express.static(__dirname + '/../public'));

// routes
app.use('/', routes.login);
app.use('/api', routes.api);
app.use('/', routes.universal);

export { app as default };
