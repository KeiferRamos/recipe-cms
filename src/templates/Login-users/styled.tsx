import styled from "styled-components";

export const StyledContainer = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  height: 100vh;
  position: relative;

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  .registering {
    .register {
      left: 0;
    }

    .login {
      left: -100%;
    }
  }
`;

export const StyledLoginContainer = styled.div`
  width: 560px;
  height: 350px;
  position: relative;
  overflow: hidden;

  section {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s;
  }

  h1 {
    width: 100%;
    position: relative;
    letter-spacing: 2px;
    font-size: 16px;
    margin-bottom: 10px;
    padding-left: 10px;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 5px;
      background-color: #f54949;
    }
  }

  .login {
    display: flex;
    flex-shrink: 0;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
    background: #fff;

    &-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 40px 30px 10px 30px;

      p {
        font-size: 13px;

        span {
          color: #1f61ef;
          cursor: pointer;
        }
      }
    }
  }

  .register {
    background: #fff;
    padding: 20px 20px;
    left: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    p {
      font-size: 13px;
      margin-right: auto;

      span {
        color: #1f61ef;
        cursor: pointer;
      }
    }

    button {
      height: 40px;
    }

    .end {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
      align-items: center;
      margin-top: 10px;
    }
  }
`;
