import session from 'express-session';
import ConnectMemcached from 'connect-memcached';

const MemcachedStore = ConnectMemcached(session);
const SESSION_STORAGE_DEFAULTS = {
  resave: false,
  saveUninitialized: false
};

export default function sessionStorageConfig(config) {
  let settings = { ...SESSION_STORAGE_DEFAULTS };

  if(config.get('SESSION:SECRET')) {
    // TODO: Log using configured session secret
    settings.secret = config.get('SESSION:SECRET');
  } else {
    // TODO: Warn using development site session secret
    settings.secret = require('crypto').randomBytes(64).toString('hex');
  }

  if(config.get('SESSION:MEMCACHED_HOST') && config.get('SESSION:MEMCACHED_SECRET')) {
    // TODO: Log memcached session store
    settings.store = new MemcachedStore({
      hosts: config.get('SESSION:MEMCACHED_HOST'),
      secret: config.get('SESSION:MEMCACHED_SECRET')
    });
  } else {
    // TODO: Log memory session store
  }

  return settings;
}
