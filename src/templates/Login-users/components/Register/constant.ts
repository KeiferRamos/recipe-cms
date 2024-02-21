import * as yup from "yup";

export const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  admin_pass: "",
  password: "",
  verify: "",
};

export const ValidationSchema = yup.object({
  first_name: yup.string().required("This Field is required!"),
  last_name: yup.string().required("This Field is required!"),
  username: yup.string().required("This Field is required!"),
  admin_pass: yup.string().required("This Field is required!"),
  password: yup.string().required("This Field is required!"),
  verify: yup.string().required("This Field is required!"),
});
