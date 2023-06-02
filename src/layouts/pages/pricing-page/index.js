// Distance Learning React examples
import { Card, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import PeopleIcon from "@mui/icons-material/People";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import MDTypography from "components/MDTypography";
import MDProgress from "components/MDProgress";

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

  const [progress, setProgress] = useState(0);

  const [allFiles, setAllFiles] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("files").then((response) => {
      setAllFiles(response.data);
      const spaceTaken = response.data.totalDiskSpace;
      if (spaceTaken > 0) {
        const progressAmount = (spaceTaken / (1024 * 1024) / 400) * 100;
        setProgress(progressAmount);
      }
    });
  }, []);

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
            <Card sx={{ marginTop: 2 }}>
              <MDBox p={3}>
                <MDBox
                  display="grid"
                  justifyContent="center"
                  alignItems="center"
                  bgColor="info"
                  color="white"
                  width="3rem"
                  height="3rem"
                  shadow="md"
                  borderRadius="lg"
                  variant="gradient"
                >
                  <Icon fontSize="default">description</Icon>
                </MDBox>
                <MDBox mt={2.625}>
                  <MDTypography variant="h5" fontWeight="medium" textTransform="capitalize">
                    Space taken by course files
                  </MDTypography>
                  <MDBox display="flex" justifyContent="space-between">
                    <MDTypography variant="body2" color="text" fontWeight="regular">
                      {allFiles ? allFiles.totalDiskSpace : "0"} kB
                    </MDTypography>
                    <MDTypography variant="body2" color="text" fontWeight="regular">
                      400 GB
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox>
                  <MDProgress value={progress} variant="contained" />
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </PageLayout>
  );
}

export default PricingPage;
