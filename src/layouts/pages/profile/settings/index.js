/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import BaseLayout from "layouts/pages/EventInfo/components/BaseLayout";
import Sidenav from "./components/Sidenav";
import Header from "./components/Header";
import ChangePassword from "./components/ChangePassword";

// Settings page components

function Settings() {
  return (
    <BaseLayout>
      <DLBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <DLBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Header />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
    </BaseLayout>
  );
}

export default Settings;
