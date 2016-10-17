import { Router } from 'express';
import {
  getMacaroon,
  authenticate,
  verify,
  logout,
  errorHandler
} from '../handlers/login.js';

const router = Router();

router.get('/login/authenticate', getMacaroon, authenticate);
router.get('/login/verify', verify);
router.post('/login/verify', verify);
router.get('/logout', logout);
router.use(errorHandler);

export default router;
