import { Association, BelongsToManyGetAssociationsMixin, DataTypes, HasManyGetAssociationsMixin, Model, Optional } from 'sequelize';
import { sequelize } from './db_config';
import Expense from './expense';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public email: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
);
User.hasMany(Expense, { foreignKey: 'userId', as: 'expenses' });
Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default User;
