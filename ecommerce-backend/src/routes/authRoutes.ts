import { Router } from 'express';

import { signUp, signIn, signOut, Me } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/authMiddleware';

const router = Router();
router.post('/register', signUp);
router.post('/login', signIn);
router.post('/logout', isAuthenticated, signOut);
router.get('/me', isAuthenticated, Me);

export default router;
