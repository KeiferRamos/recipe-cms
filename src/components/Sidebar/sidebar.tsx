import { Avatar, Menu, Modal } from "antd";
import { items } from "./constant";
import { StyledSidebar, UserInfo } from "./styled";
import {
  ExclamationCircleFilled,
  RollbackOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

const { confirm } = Modal;

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: sessionStorage.getItem("name"),
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("id"),
  });

  const navigateUser = (key: string) => {
    if (key.includes("/")) {
      return navigate(key);
    }
    return;
  };

  const showConfirm = () => {
    confirm({
      title: "You're about to Logout",
      icon: <ExclamationCircleFilled />,
      content: "Are you sure you want to logout?",
      onOk() {
        sessionStorage.clear();
        navigate("/");
      },
    });
  };

  return (
    <StyledSidebar>
      <h1>RECIPE & BLOGS CMS</h1>
      <Menu
        onClick={({ key }) => navigateUser(key)}
        items={items}
        style={{ width: 290, background: "none" }}
        mode="inline"
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={["manage-users", "manage-content"]}
      />
      <UserInfo>
        <Avatar
          style={{ backgroundColor: "#68add0" }}
          icon={<UserOutlined />}
          size={40}
          onClick={() => navigate(`/manage-admin/edit-admin/${admin.id}`)}
        />
        <div>
          <p>{admin.name}</p>
          <p>{admin.role}</p>
        </div>
        <span className="log-out" onClick={showConfirm}>
          <RollbackOutlined />
        </span>
      </UserInfo>
    </StyledSidebar>
  );
}

export default Sidebar;
