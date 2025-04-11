import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import MasterList from './MasterList';
import Department from './Department';

interface EquipmentListAttributes {
  id: string;
  status: string;
  masterListId: string;
  departmentId: string;
  gxpImportanceEvaluationResult: string;
  group: string;
  equipmentCode: string;
  sopCreation: boolean;
  calibrationQualificationEvaluation: boolean;
  equipmentUsageRecordCreation: boolean;
  calibrationQualification: string;
  qualificationEvaluationCycle: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EquipmentListCreationAttributes extends Optional<EquipmentListAttributes, 'id'> {}

class EquipmentList extends Model<EquipmentListAttributes, EquipmentListCreationAttributes> implements EquipmentListAttributes {
  public id!: string;
  public status!: string;
  public masterListId!: string;
  public departmentId!: string;
  public gxpImportanceEvaluationResult!: string;
  public group!: string;
  public equipmentCode!: string;
  public sopCreation!: boolean;
  public calibrationQualificationEvaluation!: boolean;
  public equipmentUsageRecordCreation!: boolean;
  public calibrationQualification!: string;
  public qualificationEvaluationCycle!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EquipmentList.init(
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
    masterListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'master_lists',
        key: 'id',
      },
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id',
      },
    },
    gxpImportanceEvaluationResult: {
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
    sopCreation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    calibrationQualificationEvaluation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    equipmentUsageRecordCreation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    calibrationQualification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qualificationEvaluationCycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'EquipmentList',
    tableName: 'equipment_lists',
    timestamps: true,
  }
);

// 관계 설정
EquipmentList.belongsTo(MasterList, { foreignKey: 'masterListId' });
EquipmentList.belongsTo(Department, { foreignKey: 'departmentId' });

export default EquipmentList;