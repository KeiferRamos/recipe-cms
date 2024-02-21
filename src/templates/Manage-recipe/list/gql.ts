import gql from "graphql-tag";

export const DELETE_RECIPE = gql`
  mutation RemoveRecipe($id: String!) {
    removeRecipe(id: $id) {
      id
      title
      name
      tags
      description
      ingredients
      instruction
      is_featured
    }
  }
`;

export const GET_RECIPES = gql`
  query Recipes {
    recipes {
      id
      title
      name
      image {
        id
        square
        landscape
      }
      is_featured
    }
  }
`;
