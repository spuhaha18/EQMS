import create from "zustand";
import { AuthState, User } from "../types";
import api from "../services/api";

interface AuthStore extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,

  // 로그인
  login: async (username, password) => {
    try {
      set({ loading: true, error: null });
      const response = await api.auth.login({ username, password });
      const { token, user } = response.data;

      // 토큰 저장
      localStorage.setItem("token", token);

      set({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isAuthenticated: false,
        user: null,
        loading: false,
        error:
          error.response?.data?.message || "로그인 중 오류가 발생했습니다.",
      });
      throw error;
    }
  },

  // 회원가입
  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      await api.auth.register(userData);
      set({ loading: false });
    } catch (error: any) {
      set({
        loading: false,
        error:
          error.response?.data?.message || "회원가입 중 오류가 발생했습니다.",
      });
      throw error;
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("token");
    set({
      isAuthenticated: false,
      user: null,
      error: null,
    });
  },

  // 인증 상태 확인
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    try {
      set({ loading: true });
      const response = await api.auth.me();
      set({
        isAuthenticated: true,
        user: response.data.user,
        loading: false,
        error: null,
      });
    } catch (error) {
      localStorage.removeItem("token");
      set({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      });
    }
  },
}));

export default useAuthStore;
