import { Router } from 'express';
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense, getExpenseByData } from '../controllers/expenseController';

const router = Router();

router.post('/', createExpense);
router.get('/', getExpenses);
router.get('/:id', getExpenseById);
router.get('/date', getExpenseByData);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
