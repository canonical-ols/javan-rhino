import Express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import url from 'url';

import * as routes from './routes/';
import conf from './configure';
import sessionConfig from './helpers/session';

const logsPath = conf.get('SERVER:LOGS_PATH') || path.join(__dirname, '../../logs/');
const accessLogStream = fs.createWriteStream(
  path.join(logsPath, 'access.log'),
  { flags: 'a' }
);
const appUrl = url.parse(conf.get('UNIVERSAL:MU_URL'));
const app = Express();

// config
if (app.get('env') === 'production') {
  app.set('trust proxy', 1);
}
// FIXME sstewart 07-Nov-2016 simplify config to host and port
app.locals.host = conf.get('SERVER:HOST') || appUrl.hostname;
app.locals.port = conf.get('SERVER:PORT') || appUrl.port;

// middleware
app.use(helmet());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(session(sessionConfig(conf)));
app.use(Express.static(__dirname + '/../public'));

// routes
app.use('/', routes.login);
app.use('/api', routes.api);
app.use('/', routes.universal);

export { app as default };
