import React, { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import { Formik } from "formik";
import { Form, SubmitButton } from "formik-antd";
import { initialValue } from "./constant";
import { RoleType } from "./constant";
import { Button, Row, message } from "antd";
import InputText from "../../../components/InputText/input";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ROLE, GET_PERMISSIONS, GET_ROLE } from "./gql";
import { StyledCheckbox } from "./styled";
import { useNavigate, useParams } from "react-router";

function RoleForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [options, setOptions] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [reinitialize, setReinitialize] = useState(false);
  const [role, setRole] = useState<RoleType>(initialValue);

  const { data } = useQuery(GET_ROLE, {
    variables: {
      id,
    },
    skip: !id,
    fetchPolicy: "no-cache",
  });

  const [createRole, { error }] = useMutation(CREATE_ROLE);

  const { data: permissionsData } = useQuery(GET_PERMISSIONS, {
    fetchPolicy: "no-cache",
  });

  const handleSubmit = async (values: RoleType) => {
    const mappedPermissions = permissions.filter(({ id }) =>
      values.permissions.includes(id)
    );

    await createRole({
      variables: {
        role: {
          ...values,
          permissions: mappedPermissions,
        },
      },
    });

    message.success({
      content: `You have successfully ${id ? "updated" : "created"} a role`,
      duration: 3,
    });
    navigate("/manage-roles");
  };

  useEffect(() => {
    if (data && data.role) {
      const {
        role: { name, id, description, permissions },
      } = data;

      setRole({
        id,
        name,
        description,
        permissions: permissions.map(({ id }: any) => id),
      });
      setReinitialize(true);
    }
  }, [data]);

  useEffect(() => {
    if (!reinitialize) {
      setReinitialize(false);
    }
  }, [reinitialize]);

  useEffect(() => {
    if (permissionsData && permissionsData.permissions) {
      setPermissions(permissionsData.permissions);
      setOptions(
        permissionsData.permissions.map((permission: any) => {
          return {
            value: permission.id,
            label: permission.description,
          };
        })
      );
    }
  }, [permissionsData]);

  return (
    <Layout
      breadcrumbs={[
        { title: "Manage Roles", href: "/manage-roles" },
        { title: "Edit" },
      ]}
      loading={false}
    >
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        initialValues={role}
        enableReinitialize={reinitialize}
      >
        {({ values, setFieldValue, dirty, isValid }) => {
          return (
            <Form>
              <Row gutter={20}>
                <InputText placeholder="name" label="Name" name="name" />
                <InputText
                  placeholder="description"
                  label="Description"
                  name="description"
                />
              </Row>
              <br />
              <h2>Permissions</h2>
              <StyledCheckbox
                options={options}
                onChange={(value) => setFieldValue("permissions", value)}
                value={values.permissions}
              ></StyledCheckbox>
              <SubmitButton disabled={!isValid || !dirty}>Save</SubmitButton>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}

export default RoleForm;
