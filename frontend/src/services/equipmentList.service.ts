// frontend/src/services/equipmentList.service.ts
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export interface EquipmentListItem {
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
  masterList?: {
    UniqueID: string;
    masterCode: string;
    equipmentName: string;
    manufacturer: string;
    modelName: string;
    // 기타 마스터 리스트 정보
  };
  department?: {
    UniqueID: string;
    departmentName: string;
  };
  riskAssessment?: {
    UniqueID: string;
    gxpImportance: string;
    // 기타 위험평가 정보
  };
}

export interface EquipmentListCreateData {
  status: string;
  masterCode: string;
  departmentId: string;
  gxpImportance: string;
  group: string;
  sopCreated: boolean;
  calibrationQualificationRequired: boolean;
  equipmentRecordRequired: boolean;
  calibrationType: string;
  qualificationPeriod: number;
}

export const getAllEquipmentList = async (): Promise<EquipmentListItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/equipment-list`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("기기 리스트 조회 실패:", error);
    throw error;
  }
};

export const getEquipmentListById = async (
  id: string
): Promise<EquipmentListItem> => {
  try {
    const response = await axios.get(`${API_URL}/api/equipment-list/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("기기 아이템 조회 실패:", error);
    throw error;
  }
};

export const createEquipmentList = async (
  data: EquipmentListCreateData
): Promise<EquipmentListItem> => {
  try {
    const response = await axios.post(`${API_URL}/api/equipment-list`, data, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("기기 아이템 생성 실패:", error);
    throw error;
  }
};

export const updateEquipmentList = async (
  id: string,
  data: Partial<EquipmentListCreateData>
): Promise<EquipmentListItem> => {
  try {
    const response = await axios.put(
      `${API_URL}/api/equipment-list/${id}`,
      data,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("기기 아이템 업데이트 실패:", error);
    throw error;
  }
};

export const deleteEquipmentList = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/equipment-list/${id}`, {
      headers: getAuthHeader(),
    });
  } catch (error) {
    console.error("기기 아이템 삭제 실패:", error);
    throw error;
  }
};

export const searchEquipmentList = async (
  params: Record<string, any>
): Promise<EquipmentListItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/equipment-list/search`, {
      headers: getAuthHeader(),
      params,
    });
    return response.data.data;
  } catch (error) {
    console.error("기기 리스트 검색 실패:", error);
    throw error;
  }
};

export const generateEquipmentCode = async (
  masterId: string
): Promise<string> => {
  try {
    const response = await axios.get(
      `${API_URL}/api/equipment-list/generate-code/${masterId}`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data.data.equipmentCode;
  } catch (error) {
    console.error("기기 코드 생성 실패:", error);
    throw error;
  }
};
