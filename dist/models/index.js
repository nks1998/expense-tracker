"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./db_config");
const expense_1 = __importDefault(require("./expense"));
const user_1 = __importDefault(require("./user"));
const db = {};
db.Sequelize = db_config_1.Sequelize;
db.sequelize = db_config_1.sequelize;
db.User = user_1.default;
db.Expense = expense_1.default;
user_1.default.hasMany(expense_1.default, { foreignKey: 'userId' });
expense_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
module.exports = db;
