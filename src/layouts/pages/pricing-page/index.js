// Distance Learning React examples
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";

// Pricing page components
import { Grid } from "@mui/material";
import { useState } from "react";
import Courses from "./components/Courses";
import Users from "./components/Users";
import NewUser from "./components/NewUser";

function PricingPage() {
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={10} ml={1} mr={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6} style={{ display: visibleAddUser ? "none" : "block" }}>
            <Courses />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Users setVisible={setVisibleAddUser} visible={visibleAddUser} />
          </Grid>
          <Grid item xs={12} lg={6} style={{ display: visibleAddUser ? "block" : "none" }}>
            <NewUser setVisible={setVisibleAddUser} visible={visibleAddUser} />
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default PricingPage;
