import React, { useEffect, useState } from "react";
import Layout from "../../layout/layout";
import { PermissionType, breadCrumbs, column, initialValue } from "./constant";
import { Button, Drawer, Modal, Row, Table, message } from "antd";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CREATE_PERMISSION,
  DELETE_PERMISSIONS,
  GET_PERMISSION,
  GET_PERMISSIONS,
} from "./gql";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { StyledActions } from "../Manage-roles/list/styled";
import { Formik } from "formik";
import InputText from "../../components/InputText/input";
import { Form, SubmitButton } from "formik-antd";

function ManagePermission() {
  const [permissions, setPermissions] = useState([]);
  const [columns, setColumns] = useState(column);
  const [reinitialize, setReinitialize] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [initialValues, setInitialValues] = useState(initialValue);

  const { data, refetch, loading } = useQuery(GET_PERMISSIONS, {
    fetchPolicy: "no-cache",
  });
  const [getPermission, { data: permission }] = useLazyQuery(GET_PERMISSION, {
    fetchPolicy: "no-cache",
  });
  const [createPermission] = useMutation(CREATE_PERMISSION);
  const [deletePermission] = useMutation(DELETE_PERMISSIONS);

  useEffect(() => {
    if (data && data.permissions) {
      setPermissions(data.permissions);
      refetch();
    }
  }, [data]);

  const handleEdit = async (id: string) => {
    await getPermission({
      variables: {
        id,
      },
    });
    setOpenDrawer(true);
  };

  const handleSubmit = async (input: PermissionType, resetForm: any) => {
    await createPermission({
      variables: {
        input,
      },
    });

    refetch();
    resetForm();
    setOpenDrawer(false);

    message.success({
      content: `Permission Sucessfully updated`,
      duration: 3,
    });
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: "Delete Permission",
      content: "Are you sure you wan't delete this permission?",
      onOk: async () => {
        await deletePermission({
          variables: {
            id,
          },
        });

        message.success({
          content: "Permission Successfully Deleted",
          duration: 3,
        });
        refetch();
      },
    });
  };

  const onClose = () => {
    setInitialValues(initialValue);
    setOpenDrawer(false);
    setReinitialize(true);
  };

  useEffect(() => {
    setColumns([
      ...columns,
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
              <EditTwoTone onClick={() => handleEdit(record.id || "")} />
            </StyledActions>
          );
        },
      },
    ]);
  }, []);

  useEffect(() => {
    if (permission && permission.permission) {
      setInitialValues(permission.permission);
      setReinitialize(true);
    }
  }, [permission]);

  useEffect(() => {
    if (!reinitialize) {
      setReinitialize(false);
    }
  }, [reinitialize]);

  return (
    <Layout breadcrumbs={breadCrumbs} loading={loading}>
      <>
        <Button onClick={() => setOpenDrawer(true)}>Add Permission</Button>
        <Drawer title="Add Permission" onClose={onClose} open={openDrawer}>
          <Formik
            enableReinitialize={reinitialize}
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) =>
              handleSubmit(values, resetForm)
            }
          >
            {() => {
              return (
                <Form>
                  <Row>
                    <InputText
                      placeholder="scope"
                      name="scope"
                      label="Scope"
                      span={24}
                    />
                  </Row>
                  <Row>
                    <InputText
                      placeholder="description"
                      name="description"
                      label="Description"
                      span={24}
                    />
                  </Row>

                  <br />
                  <SubmitButton>save</SubmitButton>
                </Form>
              );
            }}
          </Formik>
        </Drawer>
        <br />
        <Table columns={columns} dataSource={permissions}></Table>
      </>
    </Layout>
  );
}

export default ManagePermission;
