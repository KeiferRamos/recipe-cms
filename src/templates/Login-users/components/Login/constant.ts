import * as yup from "yup";

export type InputType = {
  username: string;
  password: string;
};

export const initialValues = {
  username: "",
  password: "",
};

export const ValidationSchema = yup.object({
  username: yup.string().required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

export type PropType = {
  eventHandler: () => void;
};
