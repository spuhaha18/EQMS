import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import Department from './Department';
import EquipmentAbbreviation from './EquipmentAbbreviation';

interface MasterListAttributes {
  id: string;
  status: string;
  equipmentAbbreviationId: string;
  serialNumber: string;
  masterCode: string;
  equipmentName: string;
  manufacturer: string;
  modelName: string;
  departmentId: string;
  managerId: string;
  installationLocation: string;
  equipmentSN?: string;
  assetNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MasterListCreationAttributes extends Optional<MasterListAttributes, 'id' | 'equipmentSN' | 'assetNumber'> {}

class MasterList extends Model<MasterListAttributes, MasterListCreationAttributes> implements MasterListAttributes {
  public id!: string;
  public status!: string;
  public equipmentAbbreviationId!: string;
  public serialNumber!: string;
  public masterCode!: string;
  public equipmentName!: string;
  public manufacturer!: string;
  public modelName!: string;
  public departmentId!: string;
  public managerId!: string;
  public installationLocation!: string;
  public equipmentSN?: string;
  public assetNumber?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MasterList.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipmentAbbreviationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'equipment_abbreviations',
        key: 'id',
      },
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
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    managerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    installationLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    equipmentSN: {
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
    modelName: 'MasterList',
    tableName: 'master_lists',
    timestamps: true,
  }
);

// 관계 설정
MasterList.belongsTo(Department, { foreignKey: 'departmentId' });
MasterList.belongsTo(EquipmentAbbreviation, { foreignKey: 'equipmentAbbreviationId' });

export default MasterList;