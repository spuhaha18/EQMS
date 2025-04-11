import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-6">
        <h1 className="text-9xl font-bold text-gray-300">404</h1>

        <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-base text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-block bg-primary-500 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
