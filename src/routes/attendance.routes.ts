import { Router } from 'express';
import { markAttendanceController } from '../controllers/attendance/markAttendance.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// Employee marks attendance
router.post('/mark', authenticate, markAttendanceController);

export default router;
