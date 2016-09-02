import { Router } from 'express';
import { macaroon, authenticate, verify, logout } from '../handlers/login.js';

const router = Router();

router.get('/login/authenticate', macaroon, authenticate);
router.get('/login/verify', verify);
router.get('/logout', logout);

export default router;
