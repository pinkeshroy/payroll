import { Router } from 'express';
import { distributePayrollController } from '../controllers/payroll/distributePayroll.controller';
import { getPayrollHistoryController } from '../controllers/payroll/getPayrollHistory.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

// HR/Admin distribute salary
router.post('/distribute', authenticate, authorize(['HR', 'ADMIN']), distributePayrollController);

// HR/Admin view past payroll
router.get('/history', authenticate, authorize(['HR', 'ADMIN']), getPayrollHistoryController);

export default router;
