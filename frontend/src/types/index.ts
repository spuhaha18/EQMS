// 사용자 관련 타입
export interface User {
  id: string;
  username: string;
  name: string;
  department: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  SUPER_ADMIN = "Super admin",
  LOCAL_ADMIN = "Local admin",
  QA_ADMIN = "QA admin",
  QA = "QA",
  USER = "User",
}

// 부서 관련 타입
export interface Department {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 기기 약어 관련 타입
export interface EquipmentAbbreviation {
  id: string;
  abbreviation: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// 마스터 리스트 관련 타입
export interface MasterList {
  id: string;
  status: string;
  equipmentAbbreviation: string;
  serialNumber: string;
  masterCode: string;
  equipmentName: string;
  manufacturer: string;
  modelName: string;
  department: string;
  manager: string;
  installationLocation: string;
  equipmentSN: string;
  assetNumber: string;
  createdAt: string;
  updatedAt: string;
}

// 기기 리스트 관련 타입
export interface EquipmentList {
  id: string;
  status: string;
  masterCode: string;
  department: string;
  gxpImportanceEvaluationResult: string;
  group: string;
  equipmentCode: string;
  sopCreation: boolean;
  calibrationQualificationEvaluation: boolean;
  equipmentUsageRecordCreation: boolean;
  calibrationQualification: string;
  qualificationEvaluationCycle: number;
  createdAt: string;
  updatedAt: string;
}

// 위험 평가 관련 타입
export interface RiskAssessment {
  id: string;
  masterCode: string;
  gxpImportanceEvaluationResult: string;
  group: string;
  equipmentCode: string;
  sopCreation: boolean;
  calibrationQualificationEvaluation: boolean;
  equipmentUsageRecordCreation: boolean;
  calibrationQualification: string;
  rdCalibration: boolean;
  qualificationEvaluationCycle: number;
  createdAt: string;
  updatedAt: string;
}

// 인증 관련 타입
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// 적격성 평가 관련 타입
export interface QualificationEvaluation {
  id: string;
  equipmentId: string;
  evaluationType: string; // IQ, OQ, PQ, IOQ, OPQ
  evaluationDate: string;
  nextEvaluationDate: string;
  documentNumber: string;
  createdAt: string;
  updatedAt: string;
}
