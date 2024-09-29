import { Router } from 'express';
import { register, login } from '../controllers/authController'
import { CreateUserDto } from '../dtos/user/createExpense.dto';
import { ValidateDto } from '../middlewares/validateDto';

const router = Router();

router.post('/register', ValidateDto(CreateUserDto), register);
router.post('/login', login);

export default router;
