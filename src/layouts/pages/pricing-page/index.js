// Distance Learning React examples
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import PeopleIcon from "@mui/icons-material/People";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { useNavigate } from "react-router-dom";

function PricingPage() {
  const navigate = useNavigate();
  const buttonStyles = () => ({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "#1A73E8",
      border: "1px solid",
      borderColor: "info",
    },
  });
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} />
      <MDBox my={3} mt={15} ml="5%" mr="5%">
        <Grid container spacing="3%">
          <Grid item xs={12} lg={6}>
            <Card sx={{ padding: 3 }}>
              <Grid container spacing="3%" sx={{ height: 200 }}>
                <Grid item xs={6} lg={6}>
                  <MDButton sx={buttonStyles} color="info" onClick={() => navigate("/admin/users")}>
                    <PeopleIcon sx={{ width: 50, height: 50, marginBottom: 1 }} />
                    Manage Users
                  </MDButton>
                </Grid>
                <Grid item xs={6} lg={6}>
                  <MDButton
                    sx={buttonStyles}
                    color="info"
                    onClick={() => navigate("/admin/courses")}
                  >
                    <CastForEducationIcon sx={{ width: 50, height: 50, marginBottom: 1 }} />
                    Manage Courses
                  </MDButton>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default PricingPage;
