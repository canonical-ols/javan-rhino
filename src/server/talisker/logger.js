import winston from 'winston';

import formatter from './lib/log-formatter.js';

/**
 * Reconfigure the default winston logger to output logs to stderr in a
 * in talisker format. This module should be imported once at the top level
 * and will configure winston throughout your app.
 */

// TODO file based transport for debug, should rotate every 24hr

winston.configure({
  levels: {
    info: 0,
    debug: 1
  },
  transports: [
    new (winston.transports.Console)({
      label: 'app',
      level: 'info', // the level this transport will log
      stderrLevels: ['info'],
      colorize: true,
      timestamp: () => {
        return new Date().toISOString()
          .replace(/T/, ' ');
      },
      formatter: formatter
    })
  ]
});

winston.info('Talisker format logging enabled on default winston logger.');

const logger = new (winston.Logger)({
  levels: {
    info: 0,
    debug: 1
  },
  transports: [
    new (winston.transports.Console)({
      label: 'app',
      level: 'info', // the level this transport will log
      stderrLevels: ['info'],
      colorize: true,
      timestamp: () => {
        return new Date().toISOString()
          .replace(/T/, ' ');
      },
      formatter: formatter
    })
  ]
});

export default logger;
