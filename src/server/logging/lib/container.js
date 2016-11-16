import winston from 'winston';

import { formatter, timestamp } from './lib/log-formatter.js';

const transports = [
  new winston.transports.Console({
    label: 'foo',
    level: 'info',
    stderrLevels: ['info'],
    timestamp: timestamp,
    formatter: formatter,
    handleExceptions: true
  })
];

export const idRewriter = (level, msg, meta, logger) => {
  if (logger.hasOwnProperty('id') && !meta.hasOwnProperty('__NAME')) {
    meta.__NAME = logger.id;
  }
  return meta;
};

export const createLogger = (name) => {

  return new winston.Logger({
    id: name,
    emitErrors: false,
    exitOnError: false,
    levels: {
      info: 0,
      debug: 1
    },
    transports: transports,
    rewriters: [ idRewriter ]
  });

};

export const container = () => {

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

export default container();
