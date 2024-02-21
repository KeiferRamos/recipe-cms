import { TableColumnProps } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import moment from "moment";

export const breadCrumbs = [{ title: "Manage Roles" }];

export type RoleType = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  permissions: {
    id: string;
    scope: string;
    description: string;
  }[];
};

export const column: ColumnsType<RoleType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Created Date",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: any) => {
      return <span>{moment.utc(value).format("YYYY-MM-DD hh:mm:A")}</span>;
    },
  },
  {
    title: "Updated Date",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value: any) => {
      return <span>{moment.utc(value).format("YYYY-MM-DD hh:mm:A")}</span>;
    },
  },
];
