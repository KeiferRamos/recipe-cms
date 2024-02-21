import { StyledContainer, StyledLoginContainer } from "./styled";
import LoginBg from "../../assets/images/login-bg.png";
import { useState } from "react";
import Login from "./components/Login/login";
import Register from "./components/Register/register";

function LoginPage() {
  const [type, setType] = useState("login");

  const setToRegister = () => setType("register");
  const setToLogin = () => setType("login");

  return (
    <StyledContainer>
      <div className="background-image">
        <img src={LoginBg} alt="" />
      </div>
      <StyledLoginContainer
        className={type === "register" ? "registering" : ""}
      >
        <Login eventHandler={setToRegister} />
        <Register eventHandler={setToLogin} />
      </StyledLoginContainer>
    </StyledContainer>
  );
}

export default LoginPage;
