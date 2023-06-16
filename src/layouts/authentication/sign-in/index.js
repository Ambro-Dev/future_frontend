import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";
import DLButton from "components/DLButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "api/axios";

import appIcon from "assets/images/logo-ct.png";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";
import { SocketContext } from "context/socket";
import io from "socket.io-client";
import LoginsTabs from "./components/LoginsTabs";

function Login() {
  const { t } = useTranslation("translation", { keyPrefix: "login" });

  const { setAuth, persist, setPersist } = useAuth();

  const { socket, setSocket } = useContext(SocketContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isMountedRef = useRef(true);

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { showErrorNotification } = useContext(ErrorContext);

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
        process.env.REACT_APP_LOGIN_URL,
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

      if (roles.includes(4004)) {
        showErrorNotification("Error", "Your account have been blocked");
      } else {
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
        if (!socket) {
          const newSocket = io(process.env.REACT_APP_SERVER_URL);
          setSocket(newSocket);
        }
        setEmail("");
        setPassword("");
        if (roles.includes(1001)) {
          navigate("/admin", { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      }
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

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <DLBox
          variant="gradient"
          bgColor="white"
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
              <DLBox component="img" src={appIcon} sx={{ height: 152, width: 152 }} />
            </Grid>
            <Grid item xs={6}>
              <DLTypography variant="h4" fontWeight="medium" color="dark" mt={7}>
                {t("signin")}
              </DLTypography>
            </Grid>
          </Grid>
        </DLBox>
        <DLBox px={2}>
          <LoginsTabs />
        </DLBox>
        <DLBox
          pt={4}
          pb={3}
          px={3}
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          <DLBox component="form" role="form" onSubmit={handleSubmit}>
            <DLBox mb={2}>
              <DLInput
                type="email"
                id="email"
                ref={emailRef}
                value={email}
                label={t("email")}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
            </DLBox>
            {errMsg}
            <DLBox mb={2}>
              <DLInput
                type="password"
                label={t("password")}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
            </DLBox>
            <DLBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={persist} onChange={togglePersist} />
              <DLTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={togglePersist}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;{t("remember")}
              </DLTypography>
            </DLBox>
            <DLBox mt={4} mb={1}>
              <DLButton
                variant="gradient"
                type="submit"
                color="info"
                onClick={handleSubmit}
                fullWidth
              >
                {t("signin")}
              </DLButton>
            </DLBox>
            <DLBox mt={3} textAlign="center">
              <DLTypography variant="button" color="text" fontWeight="regular">
                Forgot password?{" "}
                <DLTypography
                  component={Link}
                  to="/authentication/reset-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Reset
                </DLTypography>
              </DLTypography>
            </DLBox>
          </DLBox>
        </DLBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
