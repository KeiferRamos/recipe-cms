import { Form, Input, SubmitButton } from "formik-antd";
import { Button, Col, Row, message } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import InputText from "../../../../components/InputText/input";
import { Formik, FormikState } from "formik";
import { ValidationSchema, initialValues } from "./constant";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const REGISTER_ADMIN = gql`
  mutation CreateAdmin($admin: CreateAdminInput!) {
    createAdmin(createAdminInput: $admin) {
      id
      first_name
      last_name
      username
      contact_no
      email
    }
  }
`;

type PropType = {
  eventHandler: () => void;
};

type ValueType = {
  first_name: string;
  last_name: string;
  username: string;
  admin_pass: string;
  password: string;
  verify: string;
};

function Register({ eventHandler }: PropType) {
  const [register, { data, error }] = useMutation(REGISTER_ADMIN);

  const registerAdmin = async (
    values: ValueType,
    resetForm: (nextState?: Partial<FormikState<ValueType>> | undefined) => void
  ) => {
    await register({
      variables: {
        admin: values,
      },
    });

    resetForm();
  };

  useEffect(() => {
    if (data) {
      message.success({
        content: "You have successfully registered",
        duration: 3,
        style: {
          textTransform: "capitalize",
        },
      });

      eventHandler();
    }

    if (error) {
      const errors: any = error.graphQLErrors[0].extensions.originalError;

      message.error({
        content: errors.message[0],
        duration: 3,
        style: {
          textTransform: "capitalize",
        },
      });
    }
  }, [error, data]);

  return (
    <section className="register">
      <h1>RECIPE & BLOGS CMS</h1>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={initialValues}
        onSubmit={(values: ValueType, { resetForm }) =>
          registerAdmin(values, resetForm)
        }
      >
        {({ dirty, isValid, resetForm }) => {
          return (
            <Form>
              <Row gutter={20}>
                <InputText
                  placeholder="first name"
                  label="First Name"
                  name="first_name"
                />
                <InputText
                  placeholder="last name"
                  label="Last Name"
                  name="last_name"
                />
              </Row>
              <Row gutter={20}>
                <InputText
                  placeholder="username"
                  label="Username"
                  name="username"
                />
                <InputText
                  placeholder="admin pass"
                  label="Admin Pass"
                  name="admin_pass"
                />
              </Row>
              <Row gutter={20}>
                <InputText
                  placeholder="password"
                  label="Password"
                  name="password"
                  secured
                />
                <InputText
                  placeholder="verify"
                  label="Verify Password"
                  name="verify"
                  secured
                />
              </Row>
              <div className="end">
                <p>
                  Already have an account?{" "}
                  <span onClick={() => eventHandler()}>Login</span>.
                </p>
                <SubmitButton type="primary" disabled={!isValid || !dirty}>
                  Register
                </SubmitButton>
                <Button type="primary" danger onClick={() => resetForm()}>
                  <ReloadOutlined />
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
}

export default Register;
