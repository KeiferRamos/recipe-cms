import { ColumnsType } from "antd/es/table";

export const breadCrumbs = [
  {
    title: "Manage Admins",
  },
];

export const initialValue = {
  id: "",
  first_name: "",
  last_name: "",
  username: "",
  contact_no: "",
  email: "",
};

export type AdminType = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  contact_no: string;
  email: string;
  roles: {
    name: string;
  }[];
};

export const column: ColumnsType<AdminType> = [
  {
    title: "username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "full name",
    dataIndex: "first_name",
    key: "first_name",
    render: (_, record) => {
      return (
        <span>
          {record.first_name} {record.last_name}
        </span>
      );
    },
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "contact no",
    dataIndex: "contact_no",
    key: "contact_no",
  },
];
