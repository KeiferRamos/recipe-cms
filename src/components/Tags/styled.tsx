import styled from "styled-components";

export const StyledTags = styled.div`
  height: 100%;
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  position: relative;
  background: #ffff;
  border: 1px solid #bebebe;
  min-height: 100px;

  p {
    color: #d5d0d0;
    margin: 0 5px;
  }

  input {
    border: none;
    background-color: transparent;
    outline: none;
    padding: 5px 0;
    height: max-content;
  }

  .recipe-tag {
    background-color: #fff;
    border: 1px solid #bebebe;
    padding: 10px;
    font-size: 13px;
    border-radius: 5px;
    height: max-content;
    color: #5d5b5b;

    svg {
      color: #e26c6c;
      margin-left: 10px;
    }
  }
`;

export const StyledDropdown = styled.div`
  position: absolute;
  top: 105%;
  left: 0;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  z-index: 1;
  background: #f2f4f6;
  display: flex;
  flex-direction: column;
  gap: 5px;

  .recipe-tag {
    color: #000;
    display: flex;
    cursor: pointer;
  }
`;
