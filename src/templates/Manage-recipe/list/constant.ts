export const breadCrumbs = [{ title: "Manage Recipes" }];

export type RecipeType = {
  id: string;
  title: string;
  name: string;
  image: {
    square: string;
    landscape: string;
  };
  cooking_time: string;
  tags: string[];
  description: string;
  ingredients: string[];
  instruction: string[];
  is_featured: boolean;
};
