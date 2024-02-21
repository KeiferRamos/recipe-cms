import React, { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ADMIN, UPDATE_ADMIN } from "./gql";
import { Formik } from "formik";
import { AdminType, ValidationSchema, initialValues } from "./constant";
import { Form, SubmitButton } from "formik-antd";
import { Row, message } from "antd";
import InputText from "../../../components/InputText/input";
import { StyledSpace } from "./styled";
import { useParams } from "react-router";

function AdminForm() {
  const { id } = useParams();
  const [admin, setAdmin] = useState(initialValues);
  const [reinitialize, setReinitialize] = useState(false);

  const [updateAdmin, { error }] = useMutation(UPDATE_ADMIN);
  const { data, refetch, loading } = useQuery(GET_ADMIN, {
    fetchPolicy: "no-cache",
    variables: {
      id,
    },
  });

  useEffect(() => {
    if (!reinitialize) {
      setReinitialize(false);
    }
  }, [reinitialize]);

  useEffect(() => {
    if (data && data.admin) {
      setAdmin(data.admin);
      setReinitialize(true);
    }
  }, [data]);

  const handleSubmit = async (admin: AdminType) => {
    await updateAdmin({
      variables: {
        admin,
      },
    });

    message.success({
      content: "You Updated Successfully your info",
      duration: 3,
    });
  };

  return (
    <Layout
      breadcrumbs={[
        { title: "Manage Admin", href: "/manage-admin" },
        { title: "Edit" },
      ]}
      loading={loading}
    >
      <Formik
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={ValidationSchema}
        initialValues={admin}
        enableReinitialize={reinitialize}
      >
        {
          <Form>
            <Row>
              <StyledSpace>
                <Row>
                  <h3>Full Name</h3>
                </Row>
                <br />
                <Row gutter={20}>
                  <InputText
                    name="first_name"
                    placeholder="first name"
                    label="First Name"
                    span={8}
                  />
                  <InputText
                    name="middle_name"
                    placeholder="middle name"
                    label="Middle Name"
                    span={8}
                  />
                  <InputText
                    name="last_name"
                    placeholder="last name"
                    label="Last Name"
                    span={8}
                  />
                </Row>
              </StyledSpace>
            </Row>
            <Row>
              <StyledSpace>
                <Row>
                  <h3>Contact Information</h3>
                </Row>
                <br />
                <Row gutter={20}>
                  <InputText name="email" placeholder="email" label="Email" />
                  <InputText
                    name="contact_no"
                    placeholder="contact no"
                    label="Contact Number"
                  />
                </Row>
              </StyledSpace>
            </Row>
            <Row>
              <StyledSpace>
                <Row>
                  <h3>Address</h3>
                </Row>
                <br />
                <Row gutter={20}>
                  <InputText
                    name="address.block"
                    placeholder="block no"
                    label="Block Number"
                    span={4}
                  />
                  <InputText
                    name="address.street"
                    placeholder="street"
                    label="Street"
                    span={8}
                  />
                  <InputText
                    span={12}
                    name="address.barangay"
                    placeholder="barangay"
                    label="Barangay"
                  />
                </Row>
                <Row gutter={20}>
                  <InputText
                    name="address.city"
                    placeholder="city"
                    label="City"
                    span={8}
                  />
                  <InputText
                    name="address.province"
                    placeholder="province"
                    label="Province"
                    span={8}
                  />
                  <InputText
                    name="address.zip_code"
                    placeholder="zip code"
                    label="Zip Code"
                    span={8}
                  />
                </Row>
              </StyledSpace>
            </Row>
            <br />
            <SubmitButton>save</SubmitButton>
          </Form>
        }
      </Formik>
    </Layout>
  );
}

export default AdminForm;
