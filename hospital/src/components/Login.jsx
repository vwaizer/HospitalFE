import React, { useState } from "react";
import styled from "styled-components";
import "./Login.css"
import Logo from "../Img/crossline.png"
export const Background = styled.div`
  height: 100vh;
  width: 100%;
  background: var(--m-3-sys-light-surface, #FFF8F6);
`;

export const CoverBox = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Login = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Tab = styled.div`
  margin-bottom: 20px;
  width:100%;
`;
const LogoBlock=styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:45%;
   
`;
export const ButtonTab = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  justify-content:center;
  align-items:center;
`;
const CoverBlock = styled.div`
  border-radius: 10%;
  background: var(--m-3-sys-light-surface-container-low, #FEF1EE);
  display: flex;
  flex-direction: column;
  justify-content: start;
  width:35%;
  padding:25px;
  
`;
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      window.location = "/";
    } else {
      setError("Username or Password is wrong");
    }
  };

  

  return (
    <div style={{ width: "100%", height: "100%", margin: "0px" }}>
      <Background>
        <CoverBox>
          <Login>
            <LogoBlock>
                <img src={Logo} alt="logo" style={{width:"45%"}}/>
                <div style={{color:"red",fontSize:"25px"}}>Hospital Data Base Management</div>
            </LogoBlock>

            <CoverBlock>
              <Title>
                <h2>Login</h2>
                <p>{error}</p>
              </Title>

              <Tab>
                <div>Username</div>
                <input
                  className="input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  style={{ width: "90%" }}
                />
              </Tab>
              <Tab>
                <div>Password</div>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  style={{ width: "90%" }}
                />
              </Tab>
              <ButtonTab>
                <button className="button-login" onClick={handleLogin}>
                  Login
                </button>
              </ButtonTab>
            </CoverBlock>
          </Login>
        </CoverBox>
      </Background>
    </div>
  );
};

export default LoginPage;
