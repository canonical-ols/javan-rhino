import url from 'url';
import lynx from 'lynx';
import responseTime from 'response-time';
import conf from '../configure';
import logging from '../logging';

const unit = conf.get('JUJU_UNIT');
const stage = conf.get('SERVICE_ENVIRONMENT');
const statsdDsn = conf.get('STATSD_DSN');
const logger = logging.getLogger('express');
const metrics = createStatsdClient(statsdDsn, 'ols.', e => logger.debug(e));

export function responseMetricsMiddleware(req, res, time) {

  if (!statsdDsn) {
    logger.debug('STATSD_DSN not set, reponseTime metrics cannot be reported.');
    return;
  }

  const stat = createStatName(stage, unit, req, res);

  logger.info(stat, time);
  metrics.timing(stat, time);
}

export function createStatName(stage='devel', unit, req, res) {
  const { url, method } = req;
  const { statusCode } = res;

  let stat = [
    stage,
    'mu',
    unit,
    'views',
    url.toLowerCase()
    .replace(/^\/|\/$|[:\.]/g, '')
    .replace(/\//g, '_'),
    method,
    statusCode,
    'response'
  ];

  return stat.filter(n => n).join('.');
}

export function createStatsdClient(dsn, scope='', errorHandler) {
  if (!dsn) {
    logger.debug('createStatsdClient, missing required param dsn.');
    return;
  }
  const { hostname, port } = url.parse(dsn);

  return new lynx(hostname, port, {
    scope: scope,
    on_error: errorHandler
  });
}


export default responseTime(responseMetricsMiddleware);
