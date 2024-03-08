import * as yup from "yup";

export type RecipeTypes = {
  id?: string;
  title: string;
  name: string;
  category: string;
  cooking_time: {
    count: number;
    type: string;
    id?: string;
  };
  tags: string[];
  image: {
    id?: string;
    square: string;
    landscape: string;
  };
  description: string;
  ingredients: string[];
  instruction: string[];
  is_featured: boolean;
  is_popular: boolean;
  similar: [];
};

export type SimilarType = {
  id: string;
  name: string;
};

export const initialValues: RecipeTypes = {
  title: "",
  name: "",
  cooking_time: {
    count: 30,
    type: "minutes",
  },
  category: "",
  tags: [],
  is_popular: false,
  image: {
    square: "",
    landscape: "",
  },
  description: "",
  ingredients: [],
  instruction: [],
  is_featured: false,
  similar: [],
};

export const validationSchema = yup.object({
  title: yup.string().required("This field is required"),
  name: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  tags: yup.array().min(1).required("This field is required"),
  ingredients: yup.array().min(1).required("This field is required"),
  instruction: yup.array().min(1).required("This field is required"),
  is_featured: yup.boolean().required("This field is required"),
  is_popular: yup.boolean().required("This field is required"),
  category: yup.string().required("This field is required"),
});

export const TimeOptions = [
  { value: "hours", label: "hours" },
  { value: "seconds", label: "seconds" },
  { value: "minutes", label: "minutes" },
];

export const Tags = [
  { value: "Easy to Cook", label: "Easy to Cook" },
  { value: "Quick Recipe", label: "Quick Recipe" },
  { value: "Healthy", label: "Healthy" },
  { value: "Cheap Meal", label: "Cheap Meal" },
  { value: "Cheap Meal", label: "Cheap Meal" },
];
