import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { UserRole } from "../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user, checkAuth, loading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [checkAuth, user]);

  // 인증 체크 중이면 로딩 표시
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">인증 상태를 확인 중입니다...</p>
        </div>
      </div>
    );
  }

  // 인증되지 않았으면 로그인 페이지로 리디렉션
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 역할 체크가 필요하고 사용자의 역할이 허용되지 않으면 접근 거부 페이지로 리디렉션
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/access-denied" replace />;
  }

  // 모든 검사를 통과하면 보호된 컴포넌트 렌더링
  return <>{children}</>;
};

export default ProtectedRoute;
