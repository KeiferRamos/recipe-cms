import React, { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import { AdminType, breadCrumbs, column } from "./constant";
import { Modal, Select, Table, message } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ADMIN, GET_ADMINS, GET_ROLES, UPDATE_USER_ROLE } from "./gql";
import { StyledActions } from "../../Manage-roles/list/styled";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

function ManageAdmins() {
  const [columns, setColumns] = useState(column);
  const [roles, setRoles] = useState([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);

  const [deleteAdmin, { error }] = useMutation(DELETE_ADMIN);

  const [updateUser] = useMutation(UPDATE_USER_ROLE);
  const { data: rolesData, loading: loadingRoles } = useQuery(GET_ROLES, {
    fetchPolicy: "no-cache",
  });
  const { data, refetch, loading } = useQuery(GET_ADMINS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.admins) {
      setAdmins(data.admins);
    }
  }, [data]);

  useEffect(() => {
    if (rolesData && rolesData.roles) {
      setRoles(
        rolesData.roles.map(({ name }: any) => {
          return { value: name, label: name };
        })
      );
    }
  }, [rolesData]);

  const handleUpdate = async (id: string, role_name: string) => {
    await updateUser({
      variables: {
        id,
        role_name,
      },
    });
    refetch();
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Delete Admin",
      content: "Are you sure you want this Admin?",
      onOk: async () => {
        await deleteAdmin({
          variables: {
            id,
          },
        });

        message.success({
          content: "Admin Successfully deleted",
          duration: 3,
        });
        refetch();
      },
    });
  };

  useEffect(() => {
    setColumns([
      ...column,
      {
        title: "role",
        dataIndex: "role",
        key: "role",
        render: (_, record) => {
          return (
            <Select
              value={record.roles[0]?.name}
              options={roles}
              onChange={(value) => handleUpdate(record.id, value)}
            />
          );
        },
      },
      {
        title: "Action",
        dataIndex: "",
        key: "id",
        render: (_, record) => {
          return (
            <StyledActions>
              <DeleteTwoTone
                twoToneColor={"#eb8888"}
                onClick={() => handleDelete(record.id || "")}
              />
            </StyledActions>
          );
        },
      },
    ]);
  }, [roles]);

  return (
    <Layout breadcrumbs={breadCrumbs} loading={loading || loadingRoles}>
      <Table dataSource={admins} columns={columns}></Table>
    </Layout>
  );
}

export default ManageAdmins;
