"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = require("./db_config");
const expense_1 = __importDefault(require("./expense"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_config_1.sequelize,
    modelName: 'User',
    tableName: 'users'
});
User.hasMany(expense_1.default, { foreignKey: 'userId', as: 'expenses' });
expense_1.default.belongsTo(User, { foreignKey: 'userId', as: 'user' });
exports.default = User;
