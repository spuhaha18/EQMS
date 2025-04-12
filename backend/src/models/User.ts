// backend/src/models/User.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface UserAttributes {
  id: string;
  username: string;
  password: string;
  name: string;
  departmentId: string;
  email: string;
  role: string;
  isApproved: boolean;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public name!: string;
  public departmentId!: string;
  public email!: string;
  public role!: string;
  public isApproved!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

export default User;
