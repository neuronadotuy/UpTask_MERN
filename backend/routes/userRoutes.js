import express from 'express';
import { register, auth, confirm } from '../controllers/userController.js'

const router = express.Router()

// auth, register, confirm users
router.post('/', register);
router.post('/login', auth);
router.get('/confirm/:token', confirm)

export default router;