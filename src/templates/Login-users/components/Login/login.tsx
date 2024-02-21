import LoginImg from "../../../../assets/images/login-img.png";
import { Row, message } from "antd";
import { Formik, FormikState } from "formik";
import { SubmitButton } from "formik-antd";
import {
  InputType,
  PropType,
  ValidationSchema,
  initialValues,
} from "./constant";
import { StyledForm } from "./styled";
import gql from "graphql-tag";
import { useLazyQuery, useMutation } from "@apollo/client";
import InputText from "../../../../components/InputText/input";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { GET_ADMIN, LOGIN_ADMIN } from "./gql";
import { updateAccessToken } from "../../../../apollo";

function Login({ eventHandler }: PropType) {
  const navigate = useNavigate();

  const [login, { data, error }] = useMutation(LOGIN_ADMIN);
  const [getAdmin, { data: admin }] = useLazyQuery(GET_ADMIN);

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const loginAdmin = async (
    values: InputType,
    resetForm: (nextState?: Partial<FormikState<InputType>> | undefined) => void
  ) => {
    await login({
      variables: {
        ...values,
      },
    });

    resetForm();
  };

  useEffect(() => {
    if (error) {
      message.error({
        content: error.message,
        duration: 3,
        style: {
          textTransform: "capitalize",
        },
      });
    }
  }, [error]);

  const setUser = async (id: string) => {
    await getAdmin({
      variables: {
        id,
      },
    });
  };

  useEffect(() => {
    if (data && data.login) {
      const { id }: any = jwtDecode(data.login.access_token);

      const newAccessToken = data.login.access_token;
      updateAccessToken(newAccessToken);

      setUser(id).then(() => {
        sessionStorage.setItem("access_token", data.login.access_token);
        navigate("/manage-recipes", { replace: true });
      });
    }
  }, [data]);

  useEffect(() => {
    if (admin && admin.admin) {
      const {
        admin: { first_name, last_name, id, roles },
      } = admin;

      sessionStorage.setItem("name", `${first_name} ${last_name}`);
      sessionStorage.setItem("role", roles[0].name);
      sessionStorage.setItem("id", id);
    }
  }, [admin]);

  return (
    <section className="login">
      <img src={LoginImg} alt="" />
      <div className="login-content">
        <h1>RECIPE & BLOGS CMS</h1>
        <Formik
          onSubmit={(values: InputType, { resetForm }) =>
            loginAdmin(values, resetForm)
          }
          initialValues={initialValues}
          validationSchema={ValidationSchema}
        >
          {({ isValid, dirty }) => {
            return (
              <StyledForm>
                <Row>
                  <InputText
                    label="Username"
                    span={24}
                    name="username"
                    placeholder="username"
                  />
                </Row>
                <Row>
                  <InputText
                    label="Password"
                    span={24}
                    name="password"
                    placeholder="password"
                    secured
                  />
                </Row>
                <br />
                <SubmitButton type="primary" disabled={!isValid || !dirty}>
                  Login
                </SubmitButton>
              </StyledForm>
            );
          }}
        </Formik>
        <p>
          Don’t have an account?{" "}
          <span onClick={() => eventHandler()}>Register</span>.
        </p>
      </div>
    </section>
  );
}

export default Login;
