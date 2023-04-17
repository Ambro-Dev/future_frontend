import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "context/AuthProvider";

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { SocketContext } from "context/socket";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import axios from "api/axios";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";

function Logout() {
  const { t } = useTranslation("translation", { keyPrefix: "logout" });
  const { socket, setSocket } = useContext(SocketContext);
  const { setAuth } = useContext(AuthContext);
  const { setPersist } = useAuth();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const logout = async () => {
    socket?.disconnect();
    setSocket(null);
    axios.get(process.env.REACT_APP_LOGOUT_URL);
    setPersist(false);
    setAuth({});
    navigate("/authentication/sign-in");
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
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {t("sure")}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={logout} fullWidth>
                {t("logout")}
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" onClick={goBack} fullWidth>
                {t("cancel")}
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Logout;
