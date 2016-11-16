import winston from 'winston';

import { formatter, timestamp } from './lib/log-formatter.js';

// configure the 2 transports, share with all loggers, label from config ...
// add bug that label should be set in logger

// path for debug logs
const debug = process.env.DEBUGLOG;

// console transport for info level messages, sent to stderr
const transports = [
  new winston.transports.Console({
    level: 'info',
    stderrLevels: ['info'],
    timestamp: timestamp,
    formatter: formatter,
    handleExceptions: true
  })
];

// our default logger settings
const loggerDefaults = {
  emitErrors: false,
  exitOnError: false,
  levels: {
    info: 0,
    debug: 1
  },
  transports: transports,
  rewriters: [ idRewriter ]
};

// set up the default logger on winston, so we can log before any application
// specific loggers are set up
winston.configure({
  ...loggerDefaults,
  id: 'winston'
});

if (debug) {
  // TODO test if can write to file
  // TODO overwrite this file every 24hrs
  // winston.info('enabling debug log', { 'path': debug });
  // winston.info('could not enable debug log, could not write to path');
  transports.push(
    winston.transports.File, {
      level: 'debug',
      timestamp: timestamp,
      formatter: formatter,
      maxFiles: 0,
      filename: debug
    });
}

export function idRewriter (level, msg, meta, logger) {
  if (logger.hasOwnProperty('id') && !meta.hasOwnProperty('__LOGGER_NAME__')) {
    meta.__LOGGER_NAME__ = logger.id;
  }
  return meta;
}

export function createLogger(name) {
  return new winston.Logger({
    ...loggerDefaults,
    id: name,
  });
}

const loggerContainer = () => {

  const loggers = {};

  return {

    getLogger(name) {
      if (!loggers[name]) {
        this.addLogger(name);
      }

      return loggers[name];
    },

    addLogger(name) {
      loggers[name] = createLogger(name);
      return loggers[name];
    },

    hasLogger(name) {
      return !!loggers[name];
    },

    closeLogger(name) {

      function _close(name) {
        if (!loggers[name]) {
          return;
        }

        loggers[name].close();
        delete loggers[name];
      }

      if (loggers[name]) {
        _close(name);
      } else {
        Object.keys(loggers).forEach((name) => {
          _close(name);
        });
      }
    }
  };
};

export default loggerContainer();
