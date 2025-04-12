// backend/src/config/database.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    "postgres://postgres:postgres@db:5432/equipment_management",
  {
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
  }
);

export default sequelize;
