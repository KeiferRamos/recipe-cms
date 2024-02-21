import styled from "styled-components";

export const RecipeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 250px;

  .featured-tag {
    position: absolute;
    top: 0;
    left: 0;
    background: #14a83e;
    margin-top: 10px;
    color: #fff;
    padding: 10px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 3px;
  }

  div {
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    height: 70px;

    span {
      display: flex;
      gap: 10px;
    }
    p {
      font-size: 13px;
    }
  }

  img {
    height: 170px;
    width: 100%;
    object-fit: cover;
  }
`;
