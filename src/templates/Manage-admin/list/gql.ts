import gql from "graphql-tag";

export const GET_ADMINS = gql`
  query Admins {
    admins {
      id
      first_name
      last_name
      username
      contact_no
      email
      roles {
        name
        id
      }
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($id: String!, $role_name: String!) {
    updateUserRole(userRoleInput: { id: $id, role_name: $role_name }) {
      id
      first_name
      last_name
      username
      contact_no
      email
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation RemoveAdmin($id: String!) {
    removeAdmin(id: $id)
  }
`;

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      name
    }
  }
`;
