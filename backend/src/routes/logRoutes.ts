import { Router } from 'express';
import { consultAndLog } from '../controllers/logController';

const router = Router()

router.get('/consultar', consultAndLog)

export default router
