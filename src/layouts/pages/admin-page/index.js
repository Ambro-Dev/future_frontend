// Distance Learning React utils
import { Grid } from "@mui/material";
import DLBox from "components/DLBox";
import PageLayout from "utils/LayoutContainers/PageLayout";
import DefaultNavbar from "utils/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";

import FooterAdmin from "./FooterAdmin";
import CourseFiles from "./Components/CourseFiles";
import LoginsChart from "./Components/LoginsChart";
import ExportCards from "./Components/ExportCards";
import ManageCard from "./Components/ManageCard";

function AdminPage() {
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} />
      <DLBox my={3} mt={15} ml="5%" mr="5%">
        <Grid container spacing="2%">
          <Grid item xs={12} lg={6}>
            <ManageCard />
            <CourseFiles />
          </Grid>
          <Grid item lg={6} xs={12}>
            <Grid container spacing={3}>
              <Grid item lg={6} xs={12} sx={{ marginTop: 2 }}>
                <LoginsChart />
              </Grid>
              <Grid item lg={6} xs={12}>
                <ExportCards />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DLBox>
      <FooterAdmin />
    </PageLayout>
  );
}

export default AdminPage;
