import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuthStore from "./store/authStore";
import { UserRole } from "./types";

// 임시 페이지 컴포넌트
const MasterList = () => <div>마스터 리스트 페이지</div>;
const EquipmentList = () => <div>기기 리스트 페이지</div>;
const RiskAssessment = () => <div>위험 평가 페이지</div>;
const QualificationEvaluation = () => <div>적격성 평가 페이지</div>;
const AdminUsers = () => <div>사용자 관리 페이지</div>;
const AdminEquipmentAbbreviations = () => <div>기기 약어 관리 페이지</div>;
const AdminAuditTrail = () => <div>감사 이력 페이지</div>;

function App() {
  const { checkAuth } = useAuthStore();

  // 앱 초기화 시 인증 상태 확인
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="App">
      <Routes>
        {/* 공개 라우트 */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* 보호된 라우트 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/master-list"
          element={
            <ProtectedRoute>
              <MasterList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/equipment-list"
          element={
            <ProtectedRoute>
              <EquipmentList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/risk-assessment"
          element={
            <ProtectedRoute>
              <RiskAssessment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/qualification-evaluation"
          element={
            <ProtectedRoute>
              <QualificationEvaluation />
            </ProtectedRoute>
          }
        />

        {/* 관리자 라우트 */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute
              allowedRoles={[
                UserRole.SUPER_ADMIN,
                UserRole.LOCAL_ADMIN,
                UserRole.QA_ADMIN,
              ]}
            >
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.SUPER_ADMIN, UserRole.LOCAL_ADMIN]}
            >
              <DepartmentManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/equipment-abbreviations"
          element={
            <ProtectedRoute
              allowedRoles={[UserRole.SUPER_ADMIN, UserRole.LOCAL_ADMIN]}
            >
              <AdminEquipmentAbbreviations />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/audit-trail"
          element={
            <ProtectedRoute
              allowedRoles={[
                UserRole.SUPER_ADMIN,
                UserRole.LOCAL_ADMIN,
                UserRole.QA_ADMIN,
              ]}
            >
              <AdminAuditTrail />
            </ProtectedRoute>
          }
        />

        {/* 404 페이지 */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </div>
  );
}

export default App;
