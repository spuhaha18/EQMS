// frontend/src/pages/AccessDenied.tsx
import React from "react";
import { Link } from "react-router-dom";

const AccessDeniedPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">접근 권한이 없습니다</h1>
      <p className="mb-6">이 페이지에 접근할 권한이 없습니다.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
