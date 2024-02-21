import gql from "graphql-tag";

export const GET_PERMISSIONS = gql`
  query Permissions {
    permissions {
      id
      scope
      description
    }
  }
`;

export const GET_ROLE = gql`
  query Role($id: String!) {
    role(id: $id) {
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

export const CREATE_ROLE = gql`
  mutation CreateRole($role: CreateRoleInput!) {
    createRole(createRoleInput: $role) {
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
