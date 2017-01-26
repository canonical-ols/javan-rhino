import { Router } from 'express';

import { universal } from '../handlers/universal';
import metrics from '../middleware/metrics';

const router = Router();

router.use(metrics);
router.get('*', universal);

export default router;
