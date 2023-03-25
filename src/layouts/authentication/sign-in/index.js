import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { SocketContext } from "context/socket";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "api/axios";
import socketio from "socket.io-client";

import appIcon from "assets/images/apple-icon.png";

const SOCKET_PORT = "http://localhost:5000";

const LOGIN_URL = "/auth";

function Login() {
  const { setSocket } = useContext(SocketContext);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isMountedRef = useRef(true);

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setErrMsg("");

    return () => {
      isMountedRef.current = false;
    };
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userId = response?.data?.id;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const name = response?.data?.name;
      const surname = response?.data?.surname;
      const picture = response?.data?.picture;
      const studentNumber = response?.data?.studentNumber;
      setAuth({
        userId,
        name,
        email,
        surname,
        roles,
        studentNumber,
        accessToken,
        picture,
      });
      console.log(accessToken);
      const newSocket = socketio.connect(SOCKET_PORT);
      setSocket(newSocket);
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={6}>
              <MDBox component="img" src={appIcon} />
            </Grid>
            <Grid item xs={6}>
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign in
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox
          pt={4}
          pb={3}
          px={3}
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                id="email"
                ref={emailRef}
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </MDBox>
            {errMsg}
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                type="submit"
                color="info"
                onClick={handleSubmit}
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
