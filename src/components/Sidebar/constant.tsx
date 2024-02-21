import {
  AppstoreOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  ShopOutlined,
  UserOutlined,
  UserSwitchOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items = [
  getItem("Manage Users", "manage-users", <UserOutlined />, [
    getItem("Roles", "/manage-roles", <DeploymentUnitOutlined />),
    getItem("Admins", "/manage-admin", <UserSwitchOutlined />),
    getItem("Permissions", "/manage-permissions", <DatabaseOutlined />),
  ]),
  getItem("Manage Content", "manage-content", <AppstoreOutlined />, [
    getItem("Recipes", "/manage-recipes", <ShopOutlined />),
    getItem("Blogs", "/manage-blogs", <VideoCameraOutlined />),
  ]),
];
