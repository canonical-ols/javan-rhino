/**
 * servicestatus adds common status endpoints to ...
 * TODO make this a standalone module
 */
import { Router } from 'express';

export const ping = (req, res) => {
  res.send('Ok');
};

export const check = (req, res) => {
  res.status(200);
};

// TODO sentry server side
// export const error = (req, res) => {
//  res.status(200);
// };
//
// TODO statsd
// export const metric = (req, res) => {
//   res.send(200);
// };
//


const router = Router();

router.get('/ping', ping);
router.head('/ping', ping);
router.options('/ping', ping);
router.get('/check', check);
//router.get('/error', error);
//router.get('/metric', metric);

export default router;
