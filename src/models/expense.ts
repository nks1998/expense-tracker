import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './db_config';
import { ExpenseType } from '../enums/expenseType.enum';

interface ExpenseAttributes {
  id: number;
  description: string;
  amount: number;
  date: Date;
  userId: number;
  type: string
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> {}

class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  public id!: number;
  public description!: string;
  public amount!: number;
  public date!: Date;
  public userId!: number;
  public type: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

}

Expense.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    type: {
      type: DataTypes.ENUM(...Object.values(ExpenseType)),
      allowNull: false,
      defaultValue: ExpenseType.UNKNOWN
    }
  },
  {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
  }
);

export default Expense;
