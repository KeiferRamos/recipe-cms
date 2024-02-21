import gql from "graphql-tag";

export const GET_BLOGS = gql`
  query Blogs {
    blogs {
      id
      title
      banner_image
      author
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation RemoveBlog($id: String!) {
    removeBlog(id: $id) {
      id
      title
      banner_image
      author
    }
  }
`;
