import styled from "styled-components";

export const StyledLayout = styled.div`
  display: flex;
  height: 100vh;

  .content {
    padding: 30px;
    flex: 1;
    height: 100%;
    overflow: scroll;
    position: relative;

    &-children {
      margin-top: 50px;
    }
  }
`;
