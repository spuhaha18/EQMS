import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { UserRole } from "../types";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 현재 경로 확인
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 사이드바 */}
      <div
        className={`bg-white shadow-lg ${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* 로고 및 브랜드 */}
          <div className="flex items-center justify-between p-4 border-b">
            {isSidebarOpen ? (
              <h1 className="text-xl font-bold text-primary-600">
                기기관리시스템
              </h1>
            ) : (
              <h1 className="text-xl font-bold text-primary-600">GMS</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isSidebarOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* 메뉴 항목 */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              <li>
                <Link
                  to="/"
                  className={`flex items-center p-2 rounded-md ${
                    isActive("/")
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">대시보드</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/master-list"
                  className={`flex items-center p-2 rounded-md ${
                    isActive("/master-list")
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">마스터 리스트</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/equipment-list"
                  className={`flex items-center p-2 rounded-md ${
                    isActive("/equipment-list")
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">기기 리스트</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/risk-assessment"
                  className={`flex items-center p-2 rounded-md ${
                    isActive("/risk-assessment")
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">위험 평가</span>}
                </Link>
              </li>

              <li>
                <Link
                  to="/qualification-evaluation"
                  className={`flex items-center p-2 rounded-md ${
                    isActive("/qualification-evaluation")
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {isSidebarOpen && <span className="ml-3">적격성 평가</span>}
                </Link>
              </li>

              {/* 관리자 메뉴 */}
              {user &&
                (user.role === UserRole.SUPER_ADMIN ||
                  user.role === UserRole.LOCAL_ADMIN ||
                  user.role === UserRole.QA_ADMIN) && (
                  <>
                    <li className="pt-4 pb-2">
                      {isSidebarOpen && (
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          관리자 메뉴
                        </span>
                      )}
                    </li>

                    <li>
                      <Link
                        to="/admin/users"
                        className={`flex items-center p-2 rounded-md ${
                          isActive("/admin/users")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        {isSidebarOpen && (
                          <span className="ml-3">사용자 관리</span>
                        )}
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/departments"
                        className={`flex items-center p-2 rounded-md ${
                          isActive("/admin/departments")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {isSidebarOpen && (
                          <span className="ml-3">부서 관리</span>
                        )}
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/equipment-abbreviations"
                        className={`flex items-center p-2 rounded-md ${
                          isActive("/admin/equipment-abbreviations")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                        {isSidebarOpen && (
                          <span className="ml-3">기기 약어 관리</span>
                        )}
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/admin/audit-trail"
                        className={`flex items-center p-2 rounded-md ${
                          isActive("/admin/audit-trail")
                            ? "bg-primary-50 text-primary-600"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                        {isSidebarOpen && (
                          <span className="ml-3">감사 이력</span>
                        )}
                      </Link>
                    </li>
                  </>
                )}
            </ul>
          </nav>

          {/* 사용자 정보 및 로그아웃 */}
          <div className="p-4 border-t">
            {user && (
              <div
                className={`flex ${
                  isSidebarOpen ? "items-start flex-col" : "justify-center"
                }`}
              >
                {isSidebarOpen ? (
                  <>
                    <div className="text-sm font-semibold text-gray-700">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-500 mb-2">
                      {user.role}
                    </div>
                  </>
                ) : (
                  <div className="mb-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-800">
                      {user.name[0]}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleLogout}
                  className={`text-sm text-gray-600 hover:text-gray-900 ${
                    isSidebarOpen ? "w-full" : ""
                  }`}
                >
                  {isSidebarOpen ? (
                    "로그아웃"
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 헤더 */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {location.pathname === "/" && "대시보드"}
              {location.pathname === "/master-list" && "마스터 리스트"}
              {location.pathname === "/equipment-list" && "기기 리스트"}
              {location.pathname === "/risk-assessment" && "위험 평가"}
              {location.pathname === "/qualification-evaluation" &&
                "적격성 평가"}
              {location.pathname === "/admin/users" && "사용자 관리"}
              {location.pathname === "/admin/departments" && "부서 관리"}
              {location.pathname === "/admin/equipment-abbreviations" &&
                "기기 약어 관리"}
              {location.pathname === "/admin/audit-trail" && "감사 이력"}
            </h1>

            {/* 사용자 정보 (작은 화면에서 표시) */}
            <div className="flex items-center">
              {user && (
                <div className="text-sm text-gray-600 mr-4 hidden md:block">
                  {user.name} ({user.role})
                </div>
              )}
            </div>
          </div>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
