import express from 'express';
import { register, auth, confirm, forgotPassword } from '../controllers/userController.js'

const router = express.Router()

// auth, register, confirm users
router.post('/', register);
router.post('/login', auth);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);

export default router;