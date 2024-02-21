import React, { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import { RoleType, breadCrumbs, column } from "./constant";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_ROLE, GET_ROLES } from "./gql";
import { Button, Modal, Table, message } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { StyledActions } from "./styled";
import { useNavigate } from "react-router";

function ManageRoles() {
  const navigate = useNavigate();

  const [roles, setRoles] = useState<RoleType[]>([]);
  const [columns, setColumns] = useState(column);

  const [deleteRole, { error }] = useMutation(DELETE_ROLE);
  const { data, refetch, loading } = useQuery(GET_ROLES, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (data && data.roles) {
      setRoles(data.roles);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Delete Role",
      content: "Are you sure you wan't delete this role?",
      onOk: async () => {
        await deleteRole({
          variables: {
            id,
          },
        });

        message.success({
          content: "Role Successfully Deleted",
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
        title: "Action",
        dataIndex: "",
        key: "id",
        render: (_, record) => {
          return (
            <StyledActions>
              <DeleteTwoTone
                twoToneColor={"#eb8888"}
                onClick={() => handleDelete(record.id)}
              />
              <EditTwoTone
                onClick={() => navigate(`/manage-roles/edit-role/${record.id}`)}
              />
            </StyledActions>
          );
        },
      },
    ]);
  }, []);

  return (
    <Layout breadcrumbs={breadCrumbs} loading={loading}>
      <Button onClick={() => navigate("/manage-roles/add-role")}>
        Add Role
      </Button>
      <Table dataSource={roles} columns={columns}></Table>
    </Layout>
  );
}

export default ManageRoles;
