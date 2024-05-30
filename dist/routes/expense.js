"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expenseController_1 = require("../controllers/expenseController");
const auth_1 = require("../middlewares/auth"); // Assuming you have an auth middleware for protected routes
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, expenseController_1.createExpense);
router.get('/', auth_1.authenticateToken, expenseController_1.getExpenses);
router.get('/:id', auth_1.authenticateToken, expenseController_1.getExpenseById);
router.put('/:id', auth_1.authenticateToken, expenseController_1.updateExpense);
router.delete('/:id', auth_1.authenticateToken, expenseController_1.deleteExpense);
exports.default = router;
