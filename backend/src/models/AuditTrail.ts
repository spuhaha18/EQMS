import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import User from './User';

interface AuditTrailAttributes {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  oldValues: any;
  newValues: any;
  ipAddress: string;
  userAgent: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AuditTrailCreationAttributes extends Optional<AuditTrailAttributes, 'id'> {}

class AuditTrail extends Model<AuditTrailAttributes, AuditTrailCreationAttributes> implements AuditTrailAttributes {
  public id!: string;
  public userId!: string;
  public action!: string;
  public entityType!: string;
  public entityId!: string;
  public oldValues!: any;
  public newValues!: any;
  public ipAddress!: string;
  public userAgent!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuditTrail.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    oldValues: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    newValues: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'AuditTrail',
    tableName: 'audit_trails',
    timestamps: true,
  }
);

// 관계 설정
AuditTrail.belongsTo(User, { foreignKey: 'userId' });

export default AuditTrail;