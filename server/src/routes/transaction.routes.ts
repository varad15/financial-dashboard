import express from 'express';
import { getTransactions, getStats } from '../controllers/transaction.controller';
import { exportTransactions } from '../controllers/export.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/', verifyToken, getTransactions);
router.get('/stats', verifyToken, getStats);
router.post('/export', verifyToken, exportTransactions);

export default router;
