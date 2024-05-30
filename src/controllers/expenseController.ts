import { Response } from 'express';
import Expense from '../models/expense';
import { AuthenticatedRequest } from '../middlewares/auth';

// Create a new expense
export const createExpense = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { description, amount, date } = req.body;
    const userId = req.user.id;

    const newExpense = await Expense.create({
      description,
      amount,
      date,
      userId,
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense', error });
  }
};

// Get all expenses for a user
export const getExpenses = async (req: AuthenticatedRequest, res: Response) => {
  const page = parseInt(req.query.page as string|| '1');
  const limit = parseInt(req.query.limit as string || '10');

  try {
    const expenses = await Expense.findAndCountAll({
      where: { userId: req.user.id }, // Ensure this filters by the authenticated user
      limit: limit,
      offset: (page - 1) * limit,
      order: [['date', 'DESC']] // Optional: order by date or any other field
    });

    res.json({
      totalPages: Math.ceil(expenses.count / limit),
      currentPage: page,
      totalItems: expenses.count,
      data: expenses.rows
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
};

// Get a specific expense by ID
export const getExpenseById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id: expenseId, userId },
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense', error });
  }
};

// Update an expense
export const updateExpense = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;
    const { description, amount, date } = req.body;

    const expense = await Expense.findOne({
      where: { id: expenseId, userId },
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expense.description = description || expense.description;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;

    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error });
  }
};

// Delete an expense
export const deleteExpense = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const expenseId = req.params.id;
    const userId = req.user.id;

    const expense = await Expense.findOne({
      where: { id: expenseId, userId },
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await expense.destroy();

    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
};
