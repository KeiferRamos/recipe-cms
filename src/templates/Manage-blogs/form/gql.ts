import gql from "graphql-tag";

export const GET_BLOG = gql`
  query Blog($id: String!) {
    blog(id: $id) {
      id
      title
      banner_image
      author
      content {
        id
        type
        value
        order
      }
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($blog: CreateBlogInput!) {
    createBlog(createBlogInput: $blog) {
      id
      title
      banner_image
      author
    }
  }
`;
