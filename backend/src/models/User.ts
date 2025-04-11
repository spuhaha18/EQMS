import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import bcrypt from 'bcryptjs';
import Department from './Department';

// 사용자 역할 정의
export enum UserRole {
  SUPER_ADMIN = 'Super admin',
  LOCAL_ADMIN = 'Local admin',
  QA_ADMIN = 'QA admin',
  QA = 'QA',
  USER = 'User'
}

interface UserAttributes {
  id: string;
  username: string;
  password: string;
  name: string;
  departmentId: string;
  email: string;
  role: UserRole;
  isApproved: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isApproved'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public password!: string;
  public name!: string;
  public departmentId!: string;
  public email!: string;
  public role!: UserRole;
  public isApproved!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // 비밀번호 확인 메소드
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
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
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      // 비밀번호 해싱 후크
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

// 관계 설정
User.belongsTo(Department, { foreignKey: 'departmentId' });

export default User;