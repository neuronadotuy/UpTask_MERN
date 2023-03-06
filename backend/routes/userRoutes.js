import express from 'express';
import { register, auth } from '../controllers/userController.js'

const router = express.Router()

// auth, register, confirm users
router.post('/', register);
router.post('/login', auth)
export default router;