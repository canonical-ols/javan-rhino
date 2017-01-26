import { Router } from 'express';
import {
  getMacaroon,
  authenticate,
  verify,
  logout,
  errorHandler
} from '../handlers/login.js';
import metrics from '../middleware/metrics';

const router = Router();

router.use(metrics);
router.get('/login/authenticate', getMacaroon, authenticate);
router.get('/login/verify', verify);
router.post('/login/verify', verify);
router.get('/logout', logout);
router.use(errorHandler);

export default router;
