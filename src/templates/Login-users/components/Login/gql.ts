import gql from "graphql-tag";

export const GET_ADMIN = gql`
  query Admin($id: String!) {
    admin(id: $id) {
      id
      first_name
      last_name
      roles {
        name
      }
    }
  }
`;

export const LOGIN_ADMIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(loginAdminInput: { username: $username, password: $password }) {
      access_token
    }
  }
`;
