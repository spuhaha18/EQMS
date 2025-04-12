// frontend/src/components/Layout/Sidebar.tsx
import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ToolOutlined,
  DatabaseOutlined,
  FileProtectOutlined,
  SettingOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isAdmin =
    user?.role === "SUPER_ADMIN" ||
    user?.role === "LOCAL_ADMIN" ||
    user?.role === "QA_ADMIN";

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={[
        {
          key: "/",
          icon: <DashboardOutlined />,
          label: "대시보드",
        },
        {
          key: "/master-list",
          icon: <DatabaseOutlined />,
          label: "마스터 리스트",
        },
        {
          key: "/equipment-list",
          icon: <ToolOutlined />,
          label: "기기 리스트",
        },
        {
          key: "/risk-assessment",
          icon: <FileProtectOutlined />,
          label: "위험평가",
        },
        {
          key: "/qualification",
          icon: <AuditOutlined />,
          label: "적격성 평가",
        },
        ...(isAdmin
          ? [
              {
                key: "admin",
                icon: <SettingOutlined />,
                label: "관리",
                children: [
                  {
                    key: "/departments",
                    label: "부서 관리",
                  },
                  {
                    key: "/equipment-abbreviations",
                    label: "기기 약어 관리",
                  },
                  {
                    key: "/users",
                    label: "사용자 관리",
                  },
                  {
                    key: "/audit-trail",
                    label: "감사 이력",
                  },
                ],
              },
            ]
          : []),
      ]}
    />
  );
};

export default Sidebar;
