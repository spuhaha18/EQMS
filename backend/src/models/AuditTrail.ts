// backend/src/models/AuditTrail.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface AuditTrailAttributes {
  id: string;
  userId: string;
  action: string;
  targetType: string;
  targetId: string;
  details: string;
  timestamp: Date;
}

class AuditTrail
  extends Model<AuditTrailAttributes>
  implements AuditTrailAttributes
{
  public id!: string;
  public userId!: string;
  public action!: string;
  public targetType!: string;
  public targetId!: string;
  public details!: string;
  public timestamp!: Date;
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
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "audit_trails",
    timestamps: true,
  }
);

export default AuditTrail;
