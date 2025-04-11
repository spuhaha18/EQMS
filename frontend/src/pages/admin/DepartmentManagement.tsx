import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import departmentService from "../../services/departmentService";
import { Department } from "../../types";

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 새로운 부서 입력 및 수정을 위한 상태
  const [newDepartmentName, setNewDepartmentName] = useState<string>("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [editName, setEditName] = useState<string>("");

  // 부서 목록 불러오기
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError(null);

      // 실제 API 연동 시 사용할 코드
      // const data = await departmentService.getAllDepartments();

      // 임시 데이터
      const data = [
        {
          id: "1",
          name: "연구개발부",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          name: "품질관리부",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          name: "생산부",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "4",
          name: "엔지니어링",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      setDepartments(data);
      setLoading(false);
    } catch (err: any) {
      setError("부서 목록을 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
      console.error("Failed to fetch departments:", err);
    }
  };

  // 컴포넌트 마운트 시 부서 목록 불러오기
  useEffect(() => {
    fetchDepartments();
  }, []);

  // 부서 추가
  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newDepartmentName.trim()) {
      setError("부서명을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 연동 시 사용할 코드
      // await departmentService.createDepartment(newDepartmentName);

      // 임시 처리 (UI 업데이트)
      const newDepartment: Department = {
        id: `${departments.length + 1}`,
        name: newDepartmentName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setDepartments([...departments, newDepartment]);
      setNewDepartmentName("");
      setLoading(false);
    } catch (err: any) {
      setError("부서를 추가하는 중 오류가 발생했습니다.");
      setLoading(false);
      console.error("Failed to add department:", err);
    }
  };

  // 부서 수정 모드 시작
  const handleEditStart = (department: Department) => {
    setEditingDepartment(department);
    setEditName(department.name);
  };

  // 부서 수정 취소
  const handleEditCancel = () => {
    setEditingDepartment(null);
    setEditName("");
  };

  // 부서 수정 저장
  const handleEditSave = async (id: string) => {
    if (!editName.trim()) {
      setError("부서명을 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 연동 시 사용할 코드
      // await departmentService.updateDepartment(id, editName);

      // 임시 처리 (UI 업데이트)
      const updatedDepartments = departments.map((dept) =>
        dept.id === id
          ? { ...dept, name: editName, updatedAt: new Date().toISOString() }
          : dept
      );

      setDepartments(updatedDepartments);
      setEditingDepartment(null);
      setEditName("");
      setLoading(false);
    } catch (err: any) {
      setError("부서를 수정하는 중 오류가 발생했습니다.");
      setLoading(false);
      console.error("Failed to update department:", err);
    }
  };

  // 부서 삭제
  const handleDeleteDepartment = async (id: string) => {
    if (!window.confirm("정말 이 부서를 삭제하시겠습니까?")) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // 실제 API 연동 시 사용할 코드
      // await departmentService.deleteDepartment(id);

      // 임시 처리 (UI 업데이트)
      const filteredDepartments = departments.filter((dept) => dept.id !== id);
      setDepartments(filteredDepartments);
      setLoading(false);
    } catch (err: any) {
      setError("부서를 삭제하는 중 오류가 발생했습니다.");
      setLoading(false);
      console.error("Failed to delete department:", err);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            부서 관리
          </h2>

          {/* 에러 메시지 */}
          {error && (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          )}

          {/* 새 부서 추가 폼 */}
          <form onSubmit={handleAddDepartment} className="mb-6">
            <div className="flex">
              <input
                type="text"
                placeholder="새 부서명 입력"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                value={newDepartmentName}
                onChange={(e) => setNewDepartmentName(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="bg-primary-500 text-white px-4 py-2 rounded-r-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={loading}
              >
                추가
              </button>
            </div>
          </form>

          {/* 부서 목록 테이블 */}
          {loading && departments.length === 0 ? (
            <div className="text-center py-4">
              <p>부서 정보를 불러오는 중...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-4">
              <p>등록된 부서가 없습니다.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      부서명
                    </th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      생성일
                    </th>
                    <th className="py-3 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      마지막 수정일
                    </th>
                    <th className="py-3 px-4 border-b text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department) => (
                    <tr key={department.id}>
                      <td className="py-4 px-4 border-b">
                        {editingDepartment?.id === department.id ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                        ) : (
                          <span className="text-gray-900">
                            {department.name}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 border-b text-gray-600">
                        {new Date(department.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 border-b text-gray-600">
                        {new Date(department.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 border-b text-right space-x-2">
                        {editingDepartment?.id === department.id ? (
                          <>
                            <button
                              onClick={() => handleEditSave(department.id)}
                              className="text-blue-600 hover:text-blue-800"
                              disabled={loading}
                            >
                              저장
                            </button>
                            <button
                              onClick={handleEditCancel}
                              className="text-gray-600 hover:text-gray-800"
                              disabled={loading}
                            >
                              취소
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEditStart(department)}
                              className="text-blue-600 hover:text-blue-800"
                              disabled={loading}
                            >
                              수정
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteDepartment(department.id)
                              }
                              className="text-red-600 hover:text-red-800"
                              disabled={loading}
                            >
                              삭제
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DepartmentManagement;
