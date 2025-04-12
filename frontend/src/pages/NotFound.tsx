// frontend/src/pages/NotFound.tsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">
        404 - 페이지를 찾을 수 없습니다
      </h1>
      <p className="mb-6">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
