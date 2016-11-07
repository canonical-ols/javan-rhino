import Express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

import * as routes from './routes/';
import conf from './configure';
import sessionConfig from './helpers/session';

const logsPath = conf.get('SERVER:LOGS_PATH') || path.join(__dirname, '../../logs/');
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

app.use(Express.static(__dirname + '/../public', { maxAge: '365d' }));

app.use('/', routes.login);
app.use('/api', routes.api);
app.use('/', routes.universal);

export { app as default };
