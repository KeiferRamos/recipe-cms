import gql from "graphql-tag";

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      name
      description
      createdAt
      updatedAt
      permissions {
        id
        scope
        description
      }
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation RemoveRole($id: String!) {
    removeRole(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
