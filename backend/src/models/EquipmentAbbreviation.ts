import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from './index';

interface EquipmentAbbreviationAttributes {
  id: string;
  abbreviation: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface EquipmentAbbreviationCreationAttributes extends Optional<EquipmentAbbreviationAttributes, 'id'> {}

class EquipmentAbbreviation extends Model<EquipmentAbbreviationAttributes, EquipmentAbbreviationCreationAttributes> implements EquipmentAbbreviationAttributes {
  public id!: string;
  public abbreviation!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EquipmentAbbreviation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    abbreviation: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'EquipmentAbbreviation',
    tableName: 'equipment_abbreviations',
    timestamps: true,
  }
);

export default EquipmentAbbreviation;