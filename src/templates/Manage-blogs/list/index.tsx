import { useEffect, useState } from "react";
import Layout from "../../../layout/layout";
import { breadCrumbs } from "./constant";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_BLOG, GET_BLOGS } from "./gql";
import AddButton from "../../../components/AddButton";
import CardDisplay from "../../../components/CardDisplay";
import { StyledContainer } from "../../Manage-recipe/list/styled";
import { Modal, message } from "antd";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);

  const { data, refetch, loading } = useQuery(GET_BLOGS, {
    fetchPolicy: "no-cache",
  });
  const [deleteBlog, { error }] = useMutation(DELETE_BLOG);

  useEffect(() => {
    if (data && data.blogs) {
      setBlogs(data.blogs);
    }
  }, [data]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Blog",
      content: "Are you sure you wan't to delet this blog?",
      onOk: async () => {
        await deleteBlog({
          variables: {
            id,
          },
        });

        message.success("Blog Deleted Successfully");
        refetch();
      },
    });
  };

  return (
    <Layout breadcrumbs={breadCrumbs} loading={loading}>
      <StyledContainer>
        <AddButton link="/manage-blogs/add-blog" label="Add Blog" />
        {blogs.map(({ title, banner_image, id }) => {
          return (
            <CardDisplay
              handleDelete={() => handleDelete(id)}
              link={`/manage-blogs/edit-blog/${id}`}
              title={title}
              image={banner_image}
            />
          );
        })}
      </StyledContainer>
    </Layout>
  );
}

export default ManageBlogs;
