import { Router } from 'express';
import Memcached from 'memcached';

import conf from '../configure.js';
import responseMetrics from '../middleware/metrics';

export const ping = (req, res) => {
  res.send('Ok');
};

export const check = (req, res) => {
  const memcached = new Memcached(conf.get('SESSION_MEMCACHED_HOST'));

  memcached.version((err, result) => {
    if (err) {
      res.status(500).send(err);
    }

    res.send(JSON.stringify(result));
    memcached.end();
  });
};

export const error = () => {
  // TODO sentry
  throw new Error('This is a servicestatus error test');
};

export const metric = (req, res) => {
  res.send(200);
};

const router = Router();

router.get('/ping', ping);
router.head('/ping', ping);
router.options('/ping', ping);
router.get('/check', check);
router.get('/error', error);
router.get('/test/statsd', responseMetrics, metric);

export default router;
