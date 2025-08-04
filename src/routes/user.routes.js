import express from 'express';
import { newUserValidator } from '../validators/user.validator';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// Route to register a new user
router.post('', newUserValidator, userController.newUser);

// Route to login user
router.post('/login', userController.userLogin);

export default router;
