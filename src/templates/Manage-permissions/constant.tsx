import { ColumnsType } from "antd/es/table";
import moment from "moment";

export const breadCrumbs = [
  {
    title: "Manage Permissions",
  },
];

export const initialValue = {
  scope: "",
  description: "",
};

export type PermissionType = {
  description: string;
  id?: string;
  scope: string;
};

export const column: ColumnsType<PermissionType> = [
  {
    title: "Scope",
    dataIndex: "scope",
    key: "name",
    render: (value: string) => {
      return (
        <p style={{ textTransform: "capitalize" }}>
          {value.split(/[:,-]/).join(" ")}
        </p>
      );
    },
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
