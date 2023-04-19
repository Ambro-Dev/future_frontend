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
import NewCourse from "./components/NewCourse";

function PricingPage() {
  const [visibleAddUser, setVisibleAddUser] = useState(false);
  const [visibleAddCourse, setVisibleAddCourse] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={10} ml={1} mr={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={6} style={{ display: visibleAddUser ? "none" : "block" }}>
            <Courses
              setVisible={setVisibleAddCourse}
              visible={visibleAddCourse}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={6} style={{ display: visibleAddCourse ? "none" : "block" }}>
            <Users setVisible={setVisibleAddUser} visible={visibleAddUser} loading={loading} />
          </Grid>
          <Grid item xs={12} lg={6} style={{ display: visibleAddUser ? "block" : "none" }}>
            <NewUser
              setVisible={setVisibleAddUser}
              visible={visibleAddUser}
              loading={loading}
              setLoading={setLoading}
            />
          </Grid>
          <Grid item xs={12} lg={6} style={{ display: visibleAddCourse ? "block" : "none" }}>
            <NewCourse
              setVisible={setVisibleAddCourse}
              visible={visibleAddCourse}
              loading={loading}
              setLoading={setLoading}
            />
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default PricingPage;
