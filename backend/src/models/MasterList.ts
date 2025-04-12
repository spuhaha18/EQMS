// backend/src/models/MasterList.ts
import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import Department from "./Department";
import EquipmentAbbreviation from "./EquipmentAbbreviation";

export interface MasterListAttributes {
  UniqueID: string;
  status: string;
  equipmentAbbreviation: string;
  serialNumber: string;
  masterCode: string;
  equipmentName: string;
  manufacturer: string;
  modelName: string;
  departmentId: string;
  responsiblePerson: string;
  installationLocation: string;
  equipmentSerialNumber?: string;
  assetNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MasterListCreationAttributes
  extends Optional<MasterListAttributes, "UniqueID"> {}

class MasterList
  extends Model<MasterListAttributes, MasterListCreationAttributes>
  implements MasterListAttributes
{
  public UniqueID!: string;
  public status!: string;
  public equipmentAbbreviation!: string;
  public serialNumber!: string;
  public masterCode!: string;
  public equipmentName!: string;
  public manufacturer!: string;
  public modelName!: string;
  public departmentId!: string;
  public responsiblePerson!: string;
  public installationLocation!: string;
  public equipmentSerialNumber?: string;
  public assetNumber?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MasterList.init(
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
    equipmentAbbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    masterCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    responsiblePerson: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    installationLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipmentSerialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assetNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "master_list",
    timestamps: true,
  }
);

// 관계 설정
MasterList.belongsTo(Department, {
  foreignKey: "departmentId",
  as: "department",
});
MasterList.belongsTo(EquipmentAbbreviation, {
  foreignKey: "equipmentAbbreviation",
  targetKey: "abbreviation",
  as: "equipmentAbbreviation",
});

export default MasterList;
