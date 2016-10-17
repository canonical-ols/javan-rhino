import { Router } from 'express';
import { json } from 'body-parser';

import { requireAuthentication, requireAuthorization } from '../middleware';
import { customers } from '../handlers/api';

const router = Router();

router.use(requireAuthentication); // has SSO login
router.use(requireAuthorization); // has SCA macaroon
router.use(json());
router.post('/purchases/customers', customers);

export default router;
