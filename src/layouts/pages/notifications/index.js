/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAlert from "components/DLAlert";
import DLButton from "components/DLButton";
import DLSnackbar from "components/DLSnackbar";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";

function Notifications() {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <DLTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <DLTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </DLTypography>
      . Give it a click if you like.
    </DLTypography>
  );

  const renderSuccessSB = (
    <DLSnackbar
      color="success"
      icon="check"
      title="Distance Learning"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <DLSnackbar
      icon="notifications"
      title="Distance Learning"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <DLSnackbar
      color="warning"
      icon="star"
      title="Distance Learning"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <DLSnackbar
      color="error"
      icon="warning"
      title="Distance Learning"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <DLBox p={2}>
                <DLTypography variant="h5">Alerts</DLTypography>
              </DLBox>
              <DLBox pt={2} px={2}>
                <DLAlert color="primary" dismissible>
                  {alertContent("primary")}
                </DLAlert>
                <DLAlert color="secondary" dismissible>
                  {alertContent("secondary")}
                </DLAlert>
                <DLAlert color="success" dismissible>
                  {alertContent("success")}
                </DLAlert>
                <DLAlert color="error" dismissible>
                  {alertContent("error")}
                </DLAlert>
                <DLAlert color="warning" dismissible>
                  {alertContent("warning")}
                </DLAlert>
                <DLAlert color="info" dismissible>
                  {alertContent("info")}
                </DLAlert>
                <DLAlert color="light" dismissible>
                  {alertContent("light")}
                </DLAlert>
                <DLAlert color="dark" dismissible>
                  {alertContent("dark")}
                </DLAlert>
              </DLBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card>
              <DLBox p={2} lineHeight={0}>
                <DLTypography variant="h5">Notifications</DLTypography>
                <DLTypography variant="button" color="text" fontWeight="regular">
                  Notifications on this page use Toasts from Bootstrap. Read more details here.
                </DLTypography>
              </DLBox>
              <DLBox p={2}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DLButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
                      success notification
                    </DLButton>
                    {renderSuccessSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DLButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
                      info notification
                    </DLButton>
                    {renderInfoSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DLButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
                      warning notification
                    </DLButton>
                    {renderWarningSB}
                  </Grid>
                  <Grid item xs={12} sm={6} lg={3}>
                    <DLButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
                      error notification
                    </DLButton>
                    {renderErrorSB}
                  </Grid>
                </Grid>
              </DLBox>
            </Card>
          </Grid>
        </Grid>
      </DLBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
