export const initialValue = {
  name: "",
  description: "",
  permissions: [],
};

export type RoleType = {
  id?: string;
  name: string;
  description: string;
  permissions: string[];
};
