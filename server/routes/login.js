import { Router } from 'express';
import { getMacaroon, authenticate, verify, logout } from '../handlers/login.js';

const router = Router();

router.get('/login/authenticate', getMacaroon, authenticate);
router.post('/login/verify', verify);
router.get('/logout', logout);

export default router;
