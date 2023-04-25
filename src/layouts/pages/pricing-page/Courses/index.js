// Distance Learning React examples
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";

// Pricing page components
import { Grid } from "@mui/material";
import { useState } from "react";
import Courses from "./components/Courses";
import NewCourse from "./components/NewCourse";

function AdminCourses() {
  const [visibleAddCourse, setVisibleAddCourse] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={10} ml={1} mr={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} lg={!visibleAddCourse ? 12 : 7}>
            <Courses
              setVisible={setVisibleAddCourse}
              visible={visibleAddCourse}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} lg={5} style={{ display: visibleAddCourse ? "block" : "none" }}>
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

export default AdminCourses;
