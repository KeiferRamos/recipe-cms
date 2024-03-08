import * as yup from "yup";

export const breadCrumbs = [
  {
    title: "Manage Blogs",
    href: "/manage-blogs",
  },
  {
    title: "Add",
  },
];

export const initialValue = {
  banner_image: "",
  title: "",
  author: "",
  trending: false,
  content: [],
};

export type BlogType = {
  id?: string;
  banner_image: string;
  title: string;
  author: string;
  trending: boolean;
  content: {
    type: "text" | "image";
    value: string;
    id?: string;
    order?: number;
  }[];
};

export const ValidationSchema = yup.object({
  banner_image: yup.string().required("This field is required"),
  title: yup.string().required("This field is required"),
  author: yup.string().required("This field is required"),
  trending: yup.boolean().required("This field is required"),
  content: yup.array().min(1).required("This field is required"),
});
