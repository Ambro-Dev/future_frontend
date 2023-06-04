import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "context/AuthProvider";

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

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
        <DLBox
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
          <DLTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            {t("sure")}
          </DLTypography>
        </DLBox>
        <DLBox pt={4} pb={3} px={3}>
          <DLBox component="form" role="form">
            <DLBox mt={4} mb={1}>
              <DLButton variant="gradient" color="info" onClick={logout} fullWidth>
                {t("logout")}
              </DLButton>
            </DLBox>
            <DLBox mt={4} mb={1}>
              <DLButton variant="gradient" color="info" onClick={goBack} fullWidth>
                {t("cancel")}
              </DLButton>
            </DLBox>
          </DLBox>
        </DLBox>
      </Card>
    </BasicLayout>
  );
}

export default Logout;
