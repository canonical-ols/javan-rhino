import session from 'express-session';
import ConnectMemcached from 'connect-memcached';

const MemcachedStore = ConnectMemcached(session);
const SESSION_DEFAULTS = {
  cookie: {
    maxAge: 4.32e+7, // 12 hours
  },
  resave: false,
  saveUninitialized: false
};

export default function sessionStorageConfig(config) {
  let settings = { ...SESSION_DEFAULTS };

  if (config.get('SERVER:COOKIE:SECURE')) {
    settings.cookie.secure = true;
  }

  if(config.get('SESSION_SECRET')) {
    // TODO: Log using configured session secret
    settings.secret = config.get('SESSION_SECRET');
  } else {
    // TODO: Error: using development site session secret
    throw new Error('Refusing to start without SESSION_SECRET environment variable');
  }

  if(config.get('SESSION_MEMCACHED_HOST') && config.get('SESSION_MEMCACHED_SECRET')) {
    // TODO: Log memcached session store
    settings.store = new MemcachedStore({
      hosts: config.get('SESSION_MEMCACHED_HOST').split(','),
      secret: config.get('SESSION_MEMCACHED_SECRET')
    });
  } else {
    // TODO: Log memory session store
  }

  return settings;
}
