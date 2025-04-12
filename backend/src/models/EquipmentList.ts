// backend/src/models/EquipmentList.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import MasterList from "./MasterList";
import Department from "./Department";

export interface EquipmentListAttributes {
  UniqueID: string;
  status: string;
  masterCode: string;
  departmentId: string;
  gxpImportance: string;
  group: string;
  equipmentCode: string;
  sopCreated: boolean;
  calibrationQualificationRequired: boolean;
  equipmentRecordRequired: boolean;
  calibrationType: string;
  qualificationPeriod: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EquipmentListCreationAttributes
  extends Optional<EquipmentListAttributes, "UniqueID"> {}

class EquipmentList
  extends Model<EquipmentListAttributes, EquipmentListCreationAttributes>
  implements EquipmentListAttributes
{
  public UniqueID!: string;
  public status!: string;
  public masterCode!: string;
  public departmentId!: string;
  public gxpImportance!: string;
  public group!: string;
  public equipmentCode!: string;
  public sopCreated!: boolean;
  public calibrationQualificationRequired!: boolean;
  public equipmentRecordRequired!: boolean;
  public calibrationType!: string;
  public qualificationPeriod!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EquipmentList.init(
  {
    UniqueID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "사용중",
    },
    masterCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    gxpImportance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipmentCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sopCreated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    calibrationQualificationRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    equipmentRecordRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    calibrationType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualificationPeriod: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12, // 기본 12개월
    },
  },
  {
    sequelize,
    tableName: "equipment_list",
    timestamps: true,
  }
);

// 관계 설정
EquipmentList.belongsTo(MasterList, {
  foreignKey: "masterCode",
  targetKey: "masterCode",
  as: "masterList",
});
EquipmentList.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});

export default EquipmentList;
