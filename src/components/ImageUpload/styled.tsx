import styled from "styled-components";

export const StyledUpload = styled.div`
  border: 5px dashed #bebebe;
  border-radius: 5px;
  padding: 10px;

  .image-container {
    height: 330px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    &-profile {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &-icon {
      width: 100px;
    }
  }
`;
