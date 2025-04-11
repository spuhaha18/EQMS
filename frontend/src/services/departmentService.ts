import api from "./api";
import { Department } from "../types";

// 부서 관련 API 서비스
const departmentService = {
  // 모든 부서 조회
  getAllDepartments: async (): Promise<Department[]> => {
    const response = await api.get("/departments");
    return response.data;
  },

  // 부서 상세 조회
  getDepartmentById: async (id: string): Promise<Department> => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },

  // 부서 생성
  createDepartment: async (name: string): Promise<Department> => {
    const response = await api.post("/departments", { name });
    return response.data;
  },

  // 부서 수정
  updateDepartment: async (id: string, name: string): Promise<Department> => {
    const response = await api.put(`/departments/${id}`, { name });
    return response.data;
  },

  // 부서 삭제
  deleteDepartment: async (id: string): Promise<void> => {
    await api.delete(`/departments/${id}`);
  },
};

export default departmentService;
