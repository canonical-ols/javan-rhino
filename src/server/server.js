import Express from 'express';
import fs from 'fs';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import chokidar from 'chokidar';

import * as routes from './routes/';
import conf from './configure';
import sessionConfig from './helpers/session';
import { clearRequireCache } from './helpers/hot-load';

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
