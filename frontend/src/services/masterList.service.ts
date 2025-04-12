// frontend/src/services/masterList.service.ts
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export interface MasterListItem {
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
  department?: {
    UniqueID: string;
    departmentName: string;
  };
  equipmentAbbreviationData?: {
    UniqueID: string;
    abbreviation: string;
    equipmentName: string;
  };
}

export interface MasterListCreateData {
  status: string;
  equipmentAbbreviation: string;
  serialNumber: string;
  equipmentName: string;
  manufacturer: string;
  modelName: string;
  departmentId: string;
  responsiblePerson: string;
  installationLocation: string;
  equipmentSerialNumber?: string;
  assetNumber?: string;
}

export const getAllMasterList = async (): Promise<MasterListItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/master-list`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("마스터 리스트 조회 실패:", error);
    throw error;
  }
};

export const getMasterListById = async (
  id: string
): Promise<MasterListItem> => {
  try {
    const response = await axios.get(`${API_URL}/api/master-list/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("마스터 아이템 조회 실패:", error);
    throw error;
  }
};

export const createMasterList = async (
  data: MasterListCreateData
): Promise<MasterListItem> => {
  try {
    const response = await axios.post(`${API_URL}/api/master-list`, data, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("마스터 아이템 생성 실패:", error);
    throw error;
  }
};

export const updateMasterList = async (
  id: string,
  data: Partial<MasterListCreateData>
): Promise<MasterListItem> => {
  try {
    const response = await axios.put(`${API_URL}/api/master-list/${id}`, data, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("마스터 아이템 업데이트 실패:", error);
    throw error;
  }
};

export const deleteMasterList = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/api/master-list/${id}`, {
      headers: getAuthHeader(),
    });
  } catch (error) {
    console.error("마스터 아이템 삭제 실패:", error);
    throw error;
  }
};

export const searchMasterList = async (
  params: Record<string, any>
): Promise<MasterListItem[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/master-list/search`, {
      headers: getAuthHeader(),
      params,
    });
    return response.data.data;
  } catch (error) {
    console.error("마스터 리스트 검색 실패:", error);
    throw error;
  }
};
