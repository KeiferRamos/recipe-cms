import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import PlusIcon from "../../assets/images/plus.png";

const StyledAdd = styled.div`
  border: 5px dashed #bebebe;
  border-radius: 10px;
  display: grid;
  place-items: center;
  text-align: center;
  width: 250px;
  min-height: 200px;

  img {
    width: 50px;
    margin-bottom: 5px;
  }
`;

type PropType = {
  label: string;
  link: string;
};

function AddButton({ label, link }: PropType) {
  const navigate = useNavigate();

  return (
    <StyledAdd>
      <div onClick={() => navigate(link)}>
        <img src={PlusIcon} alt="" />
        <p>{label}</p>
      </div>
    </StyledAdd>
  );
}

export default AddButton;
