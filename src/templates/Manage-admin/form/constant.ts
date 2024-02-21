import * as yup from "yup";

export const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  contact_no: "",
  middle_name: "",
  email: "",
  address: {
    block: "",
    street: "",
    barangay: "",
    city: "",
    province: "",
    zip_code: "",
  },
};

export type AdminType = {
  username: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  contact_no: string;
  email: string;
  address: {
    block: string;
    street: string;
    barangay: string;
    city: string;
    province: string;
    zip_code: string;
  };
};

export const ValidationSchema = yup.object({
  username: yup.string().required("This field is required!"),
  first_name: yup.string().required("This field is required!"),
  middle_name: yup.string().required("This field is required!"),
  last_name: yup.string().required("This field is required!"),
  contact_no: yup.string().required("This field is required!"),
  address: yup.object().shape({
    block: yup.string().required("This field is required!"),
    street: yup.string().required("This field is required!"),
    barangay: yup.string().required("This field is required!"),
    city: yup.string().required("This field is required!"),
    province: yup.string().required("This field is required!"),
    zip_code: yup.string().required("This field is required!"),
  }),
});
