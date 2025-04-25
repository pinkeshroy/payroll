import { Router } from 'express';
import { calculateSalaryController } from '../controllers/salary/calculateSalary.controller';
import { getEmployeeSalaryController } from '../controllers/salary/getEmployeeSalary.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post('/calculate', authenticate, authorize(['HR', 'ADMIN']), calculateSalaryController);

router.get('/:employeeId', authenticate, getEmployeeSalaryController);

export default router;
