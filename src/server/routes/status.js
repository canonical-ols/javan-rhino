import { Router } from 'express';
import Memcached from 'memcached';

import conf from '../configure.js';
import responseMetrics from '../middleware/metrics';

export const ping = (req, res) => {
  res.send('Ok');
};

export const check = (req, res, next) => {
  const memcached = new Memcached(conf.get('SESSION_MEMCACHED_HOST'));

  memcached.version((err, result) => {
    if (err) {
      next(err);
    }

    res.send(JSON.stringify(result));
    memcached.end();
  });
};

export const error = () => {
  throw new Error('This is a servicestatus error test');
};

export const metric = (req, res) => {
  // metric sent via middleware on route
  res.sendStatus(200);
};

const router = Router();

router.get('/ping', ping);
router.head('/ping', ping);
router.options('/ping', ping);
router.get('/check', check);
router.get('/test/sentry', error);
router.get('/test/statsd', responseMetrics, metric);

export default router;
