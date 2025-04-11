import React from "react";
import { Link } from "react-router-dom";

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center p-6">
        <svg
          className="mx-auto h-24 w-24 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>

        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          접근 권한이 없습니다
        </h2>
        <p className="mt-2 text-base text-gray-600">
          이 페이지에 접근할 수 있는 권한이 없습니다. 관리자에게 문의하세요.
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

export default AccessDenied;
