import React, {useState} from "react";
import styled from "styled-components";
import "./Login.css";
import Logo from "../../Img/crossline.png";
import {
    Paper,
    Typography,
    Container,
    Box,
    Stack,
    TextField,
    Button,
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import axios from "axios";


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
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Tab = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;
const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
`;
export const ButtonTab = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
`;
const CoverBlock = styled.div`
  border-radius: 10%;
  background: var(--m-3-sys-light-surface-container-low, #FEF1EE);
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 35%;
  padding: 25px;

`;
const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        try {
            await axios.post("http://localhost:8000/login", {username, password}).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    window.location = "/Home";
                } else if (res.status === 401) {
                    alert("Invalid Username or Password");
                }
            }).catch(err => {
                alert("Invalid Username or Password");
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }

        // if (username === "admin" && password === "123456") {
        //     window.location = "/Home";
        //
        // } else {
        //     setError("Username or Password is wrong");
        // }
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);


    return (
        /*    // <div style={{ width: "100%", height: "100%", margin: "0px" }}>
            //   <Background>
            //     <CoverBox>
            //       <Login>
            //         <LogoBlock>
            //             <img src={Logo} alt="logo" style={{width:"320px", height:"320px"}}/>
            //             <Typography variant="h3" color="primary" style={{}}>Hospital Data base management</Typography>
            //         </LogoBlock>

            //         <CoverBlock>
            //           <Title>
            //             <h2>Login</h2>
            //             <p>{error}</p>
            //           </Title>

            //           <Tab>
            //             <div>Username</div>
            //             <input
            //               className="input"
            //               type="text"
            //               value={username}
            //               onChange={(e) => setUsername(e.target.value)}
            //               placeholder="Username"
            //               style={{ width: "90%" }}
            //             />
            //           </Tab>
            //           <Tab>
            //             <div>Password</div>
            //             <input
            //               className="input"
            //               type="password"
            //               value={password}
            //               onChange={(e) => setPassword(e.target.value)}
            //               placeholder="Password"
            //               style={{ width: "90%" }}
            //             />
            //           </Tab>
            //           <ButtonTab>
            //             <button className="button-login" onClick={handleLogin}>
            //               Login
            //             </button>
            //           </ButtonTab>
            //         </CoverBlock>
            //       </Login>
            //     </CoverBox>
            //   </Background>
            // </div>*/
        <Box>
            {/* Hospital Logo and title */}
            <Stack direction="row" spacing={10} justifyContent="center" alignItems="center" sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#FFF8F6'
            }}>
                <Stack justifyContent="center" alignItems="center" spacing={3}>
                    <img src={Logo} alt="logo" style={{width: "320px", height: "320px"}}/>
                    <Typography variant="h3" color="primary" textAlign={'center'}>Hospital Data
                        base <br/>management</Typography>
                </Stack>
                {/* Login form */}
                <Paper elevation={5} sx={{
                    width: '480px',
                    height: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FEF1EE'
                }}>
                    <Typography variant="h3" color="primary" mb={5}>Login</Typography>
                    {/* login form, implement the login system here */}
                    <form id="login-form" method="POST" sx={{display: 'flex', justifyContent: 'center'}}>
                        <Stack direction="column" spacing={0} mb={5} sx={{width: '400px'}}>
                            <Typography variant="h6" color="primary">Username</Typography>
                            <TextField
                                label="Username"
                                variant="filled"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                sx={{width: '95%', margin: '8px'}}/>
                            <Typography variant="h6" color="primary">Password</Typography>
                            <TextField
                                label="Password"
                                variant="filled"
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                required
                                InputProps={{
                                    endAdornment:
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                }}
                                sx={{width: '95%', margin: '8px'}}/>
                        </Stack>
                    </form>
                    <Button variant="contained" color="primary" onClick={handleLogin}
                            sx={{margin: '8px'}}>Login</Button>
                </Paper>
            </Stack>
        </Box>
    );
};

export default LoginPage;
