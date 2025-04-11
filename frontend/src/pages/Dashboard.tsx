import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Layout from '../components/Layout';

interface DashboardStats {
  totalEquipment: number;
  pendingEvaluations: number;
  upcomingEvaluations: number;
  departmentStats: {
    department: string;
    count: number;
  }[];
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // 실제 API 연동 시에는 아래 코드 사용
        // const response = await api.dashboard.getStats();
        // setStats(response.data);
        
        // 임시 데이터로 UI 구현
        setTimeout(() => {
          setStats({
            totalEquipment: 287,
            pendingEvaluations: 12,
            upcomingEvaluations: 24,
            departmentStats: [
              { department: '연구개발부', count: 87 },
              { department: '품질관리부', count: 65 },
              { department: '생산부', count: 94 },
              { department: '엔지니어링', count: 41 }
            ]
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}님, 안녕하세요!</h2>
          <p className="text-gray-600">기기 관리 시스템의 현황입니다.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2">데이터를 불러오는 중입니다...</p>
            </div>
          </div>
        ) : (
          stats && (
            <>
              {/* 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-primary-100 text-primary-800">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-700">전체 기기</h3>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalEquipment}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-700">평가 예정</h3>
                      <p className="text-3xl font-bold text-gray-900">{stats.upcomingEvaluations}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-red-100 text-red-800">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-700">지연 평가</h3>
                      <p className="text-3xl font-bold text-gray-900">{stats.pendingEvaluations}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 부서별 통계 */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">부서별 기기 현황</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">부서명</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기기 수</th>
                        <th className="py-3 px-4 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">비율</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.departmentStats.map((dept, index) => (
                        <tr key={index}>
                          <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-900">
                            {dept.department}
                          </td>
                          <td className="py-4 px-4 border-b border-gray-200 text-sm text-gray-900">
                            {dept.count}
                          </td>
                          <td className="py-4 px-4 border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
                                <div
                                  className="h-full bg-primary-500 rounded-full"
                                  style={{ width: `${(dept.count / stats.totalEquipment) * 100}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">
                                {Math.round((dept.count / stats.totalEquipment) * 100)}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 빠른 링크 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">빠른 링크</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="/master-list" className="text-primary-600 hover:text-primary-800">
                        → 마스터 리스트 조회
                      </a>
                    </li>
                    <li>
                      <a href="/equipment-list" className="text-primary-600 hover:text-primary-800">
                        → 기기 리스트 조회
                      </a>
                    </li>
                    <li>
                      <a href="/master-list/new" className="text-primary-600 hover:text-primary-800">
                        → 신규 기기 등록
                      </a>
                    </li>
                    <li>
                      <a href="/qualification-evaluation" className="text-primary-600 hover:text-primary-800">
                        → 적격성 평가 관리
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">최근 공지사항</h3>
                  <p className="text-gray-500 italic">공지사항이 없습니다.</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">도움말</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    기기 관리 시스템 사용에 어려움이 있으신가요?
                  </p>
                  
                    href="/help"
                    className="inline-block px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    사용자 매뉴얼 보기
                  </a>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;