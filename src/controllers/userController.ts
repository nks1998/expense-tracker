import { Request, Response } from 'express';
import User from '../models/user';
import Expense from '../models/expense';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll({
            include: [{ model: Expense, as: 'expenses' }]
        });
        res.json(users);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching users', error });
    }
  };
  
  // Get user by ID
  export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id, {
        include: [{ model: Expense, as: "expenses" }],
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching user', error });
    }
};
