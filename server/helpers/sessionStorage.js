import session from 'express-session';
import MongoConnect from 'connect-mongo';

const DEFAULTS = {
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
};

export default function(conf) {
  let settings = DEFAULTS;

  if (conf.get('DATABASE')) {
    // TODO: Log database session storage
    const MongoStore = MongoConnect(session);
    const sessionStore = new MongoStore({
      url: conf.get('DATABASE:URL')
    });

    settings = Object.assign(settings, {
      secret: conf.get('DATABASE:SECRET'),
      store: sessionStore
    });
  } else {
    // TODO: Log memory session storage
  }

  return settings;
}
