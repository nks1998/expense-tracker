"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenseById = exports.getExpenses = exports.createExpense = void 0;
const expense_1 = __importDefault(require("../models/expense"));
// Create a new expense
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, amount, date } = req.body;
        const userId = req.user.id; // Assuming the auth middleware attaches the user to the req
        const newExpense = yield expense_1.default.create({
            description,
            amount,
            date,
            userId,
        });
        res.status(201).json(newExpense);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating expense', error });
    }
});
exports.createExpense = createExpense;
// Get all expenses for a user
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(req.query.page || '1');
    const limit = parseInt(req.query.limit || '10');
    console.log(req.query, "niha");
    try {
        const expenses = yield expense_1.default.findAndCountAll({
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
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
});
exports.getExpenses = getExpenses;
// Get a specific expense by ID
const getExpenseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;
        const expense = yield expense_1.default.findOne({
            where: { id: expenseId, userId },
        });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching expense', error });
    }
});
exports.getExpenseById = getExpenseById;
// Update an expense
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;
        const { description, amount, date } = req.body;
        const expense = yield expense_1.default.findOne({
            where: { id: expenseId, userId },
        });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        expense.description = description || expense.description;
        expense.amount = amount || expense.amount;
        expense.date = date || expense.date;
        yield expense.save();
        res.status(200).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating expense', error });
    }
});
exports.updateExpense = updateExpense;
// Delete an expense
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;
        const expense = yield expense_1.default.findOne({
            where: { id: expenseId, userId },
        });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        yield expense.destroy();
        res.status(200).json({ message: 'Expense deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
});
exports.deleteExpense = deleteExpense;
