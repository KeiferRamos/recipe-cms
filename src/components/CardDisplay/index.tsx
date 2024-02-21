import React from "react";
import { RecipeContainer } from "./styled";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

type PropType = {
  title: string;
  image: string;
  isFeatured?: boolean;
  link: string;
  handleDelete: () => void;
};

function CardDisplay({
  title,
  image,
  isFeatured,
  link,
  handleDelete,
}: PropType) {
  return (
    <RecipeContainer>
      {isFeatured ? <span className="featured-tag">featured</span> : null}
      <img src={image} alt="" />
      <div>
        <p>{title}</p>
        <span>
          <Link to={link}>
            <EditTwoTone />
          </Link>
          <DeleteTwoTone
            onClick={() => handleDelete()}
            twoToneColor={"#ef9595"}
          />
        </span>
      </div>
    </RecipeContainer>
  );
}

export default CardDisplay;
