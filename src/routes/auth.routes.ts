import { Router } from 'express';
import { loginController  } from '../controllers/auth/login.controller';
import { logoutController } from '../controllers/auth/logout.controller';

const router = Router();

router.post('/login',  loginController);
router.post('/logout', logoutController);

export default router;
