import gql from "graphql-tag";

export const GET_PERMISSIONS = gql`
  query Permissions {
    permissions {
      id
      scope
      description
      createdAt
      updatedAt
    }
  }
`;

export const GET_PERMISSION = gql`
  query Permission($id: String!) {
    permission(id: $id) {
      id
      scope
      description
    }
  }
`;

export const DELETE_PERMISSIONS = gql`
  mutation RemovePermission($id: String!) {
    removePermission(id: $id) {
      id
      scope
      description
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PERMISSION = gql`
  mutation CreatePermission($input: CreatePermissionInput!) {
    createPermission(createPermissionInput: $input) {
      id
      scope
      description
      createdAt
      updatedAt
    }
  }
`;
