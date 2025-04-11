import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import MasterList from './MasterList';

interface RiskAssessmentAttributes {
  id: string;
  masterListId: string;
  gxpImportanceEvaluationResult: string;
  group: string;
  equipmentCode: string;
  sopCreation: boolean;
  calibrationQualificationEvaluation: boolean;
  equipmentUsageRecordCreation: boolean;
  calibrationQualification: string;
  rdCalibration: boolean;
  qualificationEvaluationCycle: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RiskAssessmentCreationAttributes extends Optional<RiskAssessmentAttributes, 'id'> {}

class RiskAssessment extends Model<RiskAssessmentAttributes, RiskAssessmentCreationAttributes> implements RiskAssessmentAttributes {
  public id!: string;
  public masterListId!: string;
  public gxpImportanceEvaluationResult!: string;
  public group!: string;
  public equipmentCode!: string;
  public sopCreation!: boolean;
  public calibrationQualificationEvaluation!: boolean;
  public equipmentUsageRecordCreation!: boolean;
  public calibrationQualification!: string;
  public rdCalibration!: boolean;
  public qualificationEvaluationCycle!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

RiskAssessment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    masterListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'master_lists',
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
    rdCalibration: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    qualificationEvaluationCycle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'RiskAssessment',
    tableName: 'risk_assessments',
    timestamps: true,
  }
);

// 관계 설정
RiskAssessment.belongsTo(MasterList, { foreignKey: 'masterListId' });

export default RiskAssessment;