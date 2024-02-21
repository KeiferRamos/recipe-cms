import gql from "graphql-tag";

export const GET_RECIPE = gql`
  query recipe($id: String!) {
    recipe(id: $id) {
      id
      title
      name
      image {
        id
        square
        landscape
      }
      category
      cooking_time {
        id
        count
        type
      }
      tags
      description
      ingredients
      instruction
      is_featured
      similar {
        id
        name
      }
    }
  }
`;

export const GET_SIMILAR_OPTION = gql`
  query Similar($id: String!) {
    Similar(id: $id) {
      id
      name
    }
  }
`;

export const CREATE_RECIPE = gql`
  mutation CreateRecipe($recipe: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $recipe) {
      id
      title
      name
      image {
        id
        square
        landscape
      }
      cooking_time {
        id
        count
        type
      }
      tags
      description
      ingredients
      instruction
      is_featured
      similar {
        name
      }
    }
  }
`;
