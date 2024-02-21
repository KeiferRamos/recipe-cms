import styled from "styled-components";

export const StyledInputHolder = styled.div`
  border: 3px dashed #bebebe;
  padding: 10px;
  border-radius: 5px;

  .add-btn {
    width: 100%;
    height: 40px;
  }

  ul {
    list-style: none;

    li {
      margin-top: 10px;
      background: #fff;
      padding: 10px;
      border-radius: 5px;
      color: #8a8888;

      display: flex;
      justify-content: space-between;
      gap: 20px;

      svg {
        color: #e66464;
        cursor: pointer;
      }
    }
  }
`;
