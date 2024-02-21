import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Layout from "../../../layout/layout";
import { RecipeType, breadCrumbs } from "./constant";
import { StyledContainer } from "./styled";
import { useMutation, useQuery } from "@apollo/client";
import { Modal, message } from "antd";
import { DELETE_RECIPE, GET_RECIPES } from "./gql";
import CardDisplay from "../../../components/CardDisplay";
import AddButton from "../../../components/AddButton";

function ManageRecipe() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const { data, loading, refetch } = useQuery(GET_RECIPES, {
    fetchPolicy: "no-cache",
  });
  const [deleteRecipe, { error }] = useMutation(DELETE_RECIPE);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Recipe",
      content: "Are you sure you wan't to delete this recipe?",
      onOk: async () => {
        await deleteRecipe({
          variables: {
            id,
          },
        });

        message.success("You have successfully deleted a recipe");
        refetch();
      },
    });
  };

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (data) {
      setRecipes(data.recipes);
    }
  }, [data]);

  return (
    <Layout breadcrumbs={breadCrumbs} loading={loading}>
      <StyledContainer>
        <AddButton label="Add Recipe" link="/manage-recipes/add-recipe" />
        {recipes.map(({ image, name, id, is_featured }: RecipeType) => {
          return (
            <CardDisplay
              link={`/manage-recipes/edit-recipe/${id}`}
              handleDelete={() => handleDelete(id)}
              title={name}
              image={image.square}
              isFeatured={is_featured}
            />
          );
        })}
      </StyledContainer>
    </Layout>
  );
}

export default ManageRecipe;
