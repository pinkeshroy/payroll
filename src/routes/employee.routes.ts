import { Router } from 'express';
import { createEmployeeController } from '../controllers/employee/createEmployee.controller';
import { getEmployeeController } from '../controllers/employee/getEmployee.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

// HR/Admin can create employee
router.post('/', authenticate, authorize(['HR', 'ADMIN']), createEmployeeController);

// HR/Admin can view any employee, Employee can view themselves
router.get('/:id', authenticate, getEmployeeController);

export default router;
