import express from 'express';
import { register, auth, confirm, forgotPassword, checkToken, newPassword, profile } from '../controllers/userController.js'
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

// auth, register, confirm users
router.post('/', register);
router.post('/login', auth);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
router.get('/forgot-password/:token', checkToken);
router.post('/forgot-password/:token', newPassword);

router.get('/profile', checkAuth, profile);

export default router;