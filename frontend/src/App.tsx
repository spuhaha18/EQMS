// frontend/src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import DashboardPage from "./pages/Dashboard";
import DepartmentPage from "./pages/Department";
import MasterListPage from "./pages/MasterList";
import CreateMasterListPage from "./pages/MasterList/CreateMasterList";
import EditMasterListPage from "./pages/MasterList/EditMasterList";
import DetailMasterListPage from "./pages/MasterList/DetailMasterList";
import EquipmentListPage from "./pages/EquipmentList";
import CreateEquipmentListPage from "./pages/EquipmentList/CreateEquipmentList";
import EditEquipmentListPage from "./pages/EquipmentList/EditEquipmentList";
import DetailEquipmentListPage from "./pages/EquipmentList/DetailEquipmentList";
import AccessDeniedPage from "./pages/AccessDenied";
import NotFoundPage from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route index element={<DashboardPage />} />
                  <Route path="departments" element={<DepartmentPage />} />

                  {/* 마스터 리스트 라우트 */}
                  <Route path="master-list" element={<MasterListPage />} />
                  <Route
                    path="master-list/create"
                    element={<CreateMasterListPage />}
                  />
                  <Route
                    path="master-list/edit/:id"
                    element={<EditMasterListPage />}
                  />
                  <Route
                    path="master-list/detail/:id"
                    element={<DetailMasterListPage />}
                  />

                  {/* 기기 리스트 라우트 */}
                  <Route
                    path="equipment-list"
                    element={<EquipmentListPage />}
                  />
                  <Route
                    path="equipment-list/create"
                    element={<CreateEquipmentListPage />}
                  />
                  <Route
                    path="equipment-list/edit/:id"
                    element={<EditEquipmentListPage />}
                  />
                  <Route
                    path="equipment-list/detail/:id"
                    element={<DetailEquipmentListPage />}
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
