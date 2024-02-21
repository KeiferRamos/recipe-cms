import gql from "graphql-tag";

export const GET_ADMIN = gql`
  query Admin($id: String!) {
    admin(id: $id) {
      first_name
      middle_name
      last_name
      username
      contact_no
      email
      address {
        id
        block
        street
        barangay
        city
        province
        zip_code
      }
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($admin: UpdateAdminInput!) {
    updateAdmin(updateAdminInput: $admin) {
      id
      first_name
      middle_name
      last_name
      username
      contact_no
      email
    }
  }
`;
