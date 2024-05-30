import { Router } from 'express';
import {  getAllUsers, getUserById } from '../controllers/userController';

const router = Router();

router.get('/', getAllUsers); // Route to get all users
router.get('/:id', getUserById); // Route to get a user by ID

export default router;
