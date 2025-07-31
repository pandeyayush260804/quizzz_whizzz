import express from 'express';
import { login, register, profile } from '../../../controllers/user-controller.js';

const router = express.Router();

router.get('/profile', profile);
router.post('/login', login);
router.post('/register', register);

export default router;
