import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';
import EquipmentList from './EquipmentList';

interface QualificationEvaluationAttributes {
  id: string;
  equipmentListId: string;
  evaluationType: string; // IQ, OQ, PQ, IOQ, OPQ
  evaluationDate: Date;
  nextEvaluationDate: Date;
  documentNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QualificationEvaluationCreationAttributes extends Optional<QualificationEvaluationAttributes, 'id'> {}

class QualificationEvaluation extends Model<QualificationEvaluationAttributes, QualificationEvaluationCreationAttributes> implements QualificationEvaluationAttributes {
  public id!: string;
  public equipmentListId!: string;
  public evaluationType!: string;
  public evaluationDate!: Date;
  public nextEvaluationDate!: Date;
  public documentNumber!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

QualificationEvaluation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    equipmentListId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'equipment_lists',
        key: 'id',
      },
    },
    evaluationType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['IQ', 'OQ', 'PQ', 'IOQ', 'OPQ']],
      },
    },
    evaluationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextEvaluationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'QualificationEvaluation',
    tableName: 'qualification_evaluations',
    timestamps: true,
  }
);

// 관계 설정
QualificationEvaluation.belongsTo(EquipmentList, { foreignKey: 'equipmentListId' });

export default QualificationEvaluation;