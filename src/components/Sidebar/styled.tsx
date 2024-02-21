import styled from "styled-components";

export const StyledSidebar = styled.aside`
  height: 100vh;
  padding-top: 40px;
  width: max-content;
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h1 {
    width: 100%;
    position: relative;
    letter-spacing: 2px;
    font-size: 16px;
    margin-bottom: 40px;
    padding-left: 10px;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      left: 35px;
      top: 0;
      height: 100%;
      width: 5px;
      background-color: #f54949;
    }
  }
`;

export const UserInfo = styled.div`
  margin-top: auto;
  padding: 20px;

  display: flex;
  align-items: center;
  gap: 10px;

  p {
    font-size: 13px;
  }

  .log-out {
    margin-left: auto;
    background: #f4aeae;
    color: #fff;
    width: 35px;
    height: 35px;
    border-radius: 3px;
    display: grid;
    font-size: 20px;
    place-items: center;
  }
`;
