import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// 데이터베이스 URL 설정
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@db:5432/equipment_management';

// Sequelize 인스턴스 생성
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  define: {
    timestamps: true, // createdAt, updatedAt 자동 생성
    underscored: true, // 스네이크 케이스 사용 (snake_case)
  },
});

// 모델 불러오기
import User from './User';
import Department from './Department';
import EquipmentAbbreviation from './EquipmentAbbreviation';
import MasterList from './MasterList';
import EquipmentList from './EquipmentList';
import RiskAssessment from './RiskAssessment';
import QualificationEvaluation from './QualificationEvaluation';
import AuditTrail from './AuditTrail';

// 모델 관계 설정은 각 모델 파일 내에서 처리

// 모델 내보내기
export {
  User,
  Department,
  EquipmentAbbreviation,
  MasterList,
  EquipmentList,
  RiskAssessment,
  QualificationEvaluation,
  AuditTrail
};