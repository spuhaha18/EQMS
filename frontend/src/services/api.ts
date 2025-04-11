import axios from "axios";

// API 베이스 URL 설정
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001/api";

// axios 인스턴스 생성
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 - 인증 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 인증 오류 처리
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰 만료 등의 인증 오류 처리
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// API 메소드 내보내기
export default {
  // 인증 관련
  auth: {
    login: (credentials: { username: string; password: string }) =>
      api.post("/auth/login", credentials),
    register: (userData: any) => api.post("/auth/register", userData),
    me: () => api.get("/auth/me"),
  },

  // 사용자 관련
  users: {
    getAll: () => api.get("/users"),
    getById: (id: string) => api.get(`/users/${id}`),
    update: (id: string, data: any) => api.put(`/users/${id}`, data),
    delete: (id: string) => api.delete(`/users/${id}`),
  },

  // 부서 관련
  departments: {
    getAll: () => api.get("/departments"),
    getById: (id: string) => api.get(`/departments/${id}`),
    create: (name: string) => api.post("/departments", { name }),
    update: (id: string, name: string) =>
      api.put(`/departments/${id}`, { name }),
    delete: (id: string) => api.delete(`/departments/${id}`),
  },

  // 기기 약어 관련
  equipmentAbbreviations: {
    getAll: () => api.get("/equipment-abbreviations"),
    getById: (id: string) => api.get(`/equipment-abbreviations/${id}`),
    create: (data: { abbreviation: string; name: string }) =>
      api.post("/equipment-abbreviations", data),
    update: (id: string, data: { abbreviation: string; name: string }) =>
      api.put(`/equipment-abbreviations/${id}`, data),
    delete: (id: string) => api.delete(`/equipment-abbreviations/${id}`),
  },
};
