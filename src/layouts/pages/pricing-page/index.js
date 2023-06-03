// Distance Learning React examples
import { Backdrop, Card, CircularProgress, Grid, Icon, Tooltip } from "@mui/material";
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
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import Fade from "@mui/material/Fade";

function PricingPage() {
  const navigate = useNavigate();
  const buttonStyles = () => ({
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    variant: "gradient",
    textAlign: "center",
    background: "linear-gradient(45deg, #1A73E8 30%, #49a3f1 90%)",
    "&:hover": {
      color: "#1A73E8",
      border: "1px solid",
      borderColor: "info",
      background: "#FFFFFF",
    },
  });

  const [progress, setProgress] = useState(null);
  const [allFiles, setAllFiles] = useState(null);
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get("files").then((response) => {
      setAllFiles(response.data);
      const spaceTaken = response.data.totalDiskSpace;
      if (!spaceTaken || spaceTaken === 0) return;
      const progressAmount = (spaceTaken / (1024 * 1024) / 400) * 100;
      const kB = spaceTaken;
      const MB = (spaceTaken / 1024).toFixed(2);
      const GB = (spaceTaken / (1024 * 1024)).toFixed(2);
      if (spaceTaken < 1024 && spaceTaken > 0)
        setProgress({ value: kB, amount: progressAmount, metric: "kB" });
      if (spaceTaken < 1024 * 1024 && spaceTaken > 1024)
        setProgress({ value: MB, amount: progressAmount, metric: "MB" });
      if (spaceTaken < 1024 * 1024 * 1024 && spaceTaken > 1024 * 1024)
        setProgress({ value: GB, amount: progressAmount, metric: "GB" });
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    axiosPrivate
      .get("admin/users")
      .then((response) => {
        const rowStatus = response.data.map((row) => {
          if (row.roles.Blocked) {
            return { ...row, status: "Blocked" };
          }
          return { ...row, status: "Active" };
        });

        const newRows = rowStatus.map((row) => {
          if (row.roles.Student) {
            return {
              name: row.name,
              surname: row.surname,
              email: row.email,
              role: "Student",
              studentNumber: row.studentNumber,
              status: row.status,
            };
          }
          if (row.roles.Teacher) {
            return {
              name: row.name,
              surname: row.surname,
              email: row.email,
              role: "Teacher",
              studentNumber: null,
              status: row.status,
            };
          }
          return {
            name: row.name,
            surname: row.surname,
            email: row.email,
            role: "Admin",
            studentNumber: null,
            status: row.status,
          };
        });
        setUsers(newRows);
      })
      .catch((err) => {
        console.error(err);
      });
    axiosPrivate
      .get("admin/courses/all")
      .then((response) => {
        const newRowes = response.data.map((row) => {
          const membersList =
            row.members.length > 0 ? row.members.map((member) => member.studentNumber) : [];

          return {
            title: row.name,
            teacher: `${row.teacherId.name} ${row.teacherId.surname}`,
            members: membersList,
            events: row.events.length,
          };
        });
        setCourses(newRowes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [loading]);

  const exportCSV = (data, tableData) => {
    const separator = ",";
    const keys = Object.keys(tableData[0]);
    const csvContent = `${keys.join(separator)}\n${tableData
      .map((row) =>
        keys
          .map((key) => {
            let cellData = row[key];
            cellData = cellData === null || cellData === undefined ? "" : cellData.toString();
            cellData = cellData.includes(separator) ? `"${cellData}"` : cellData;
            return cellData;
          })
          .join(separator)
      )
      .join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `table-${data}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function exportButton(data) {
    const dataToExport = data === "users" ? users : courses;
    return (
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={`Export ${data}`}
        placement="top"
      >
        <MDButton
          variant="gradient"
          sx={{
            height: "100%",
            width: "4em",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          color="info"
          onClick={() => exportCSV(data, dataToExport)}
        >
          <ImportExportIcon sx={{ width: 40, height: 40 }} />
        </MDButton>
      </Tooltip>
    );
  }

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} />
      {!loading ? (
        <MDBox my={3} mt={15} ml="5%" mr="5%">
          <Grid container spacing="2%">
            <Grid item xs={12} lg={6}>
              <Card sx={{ padding: 3 }}>
                <Grid container spacing="3%" sx={{ height: 200 }}>
                  <Grid item xs={6} lg={6}>
                    <MDButton
                      sx={buttonStyles}
                      color="info"
                      onClick={() => navigate("/admin/users")}
                    >
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
                {allFiles ? (
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
                          {progress ? `${progress.value} ${progress.metric}` : "0 kB"}
                        </MDTypography>
                        <MDTypography variant="body2" color="text" fontWeight="regular">
                          400 GB
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                    <MDBox>
                      <MDProgress value={progress ? progress.amount : 0} variant="contained" />
                    </MDBox>
                  </MDBox>
                ) : (
                  <MDBox
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </MDBox>
                )}
              </Card>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid container spacing={3}>
                <Grid item lg={6} xs={12} sx={{ marginTop: 2 }}>
                  <VerticalBarChart
                    fullWidth
                    icon={{ color: "info", component: "leaderboard" }}
                    title="Vertical Bar Chart"
                    description="Sales related to age average"
                    chart={{
                      labels: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
                      datasets: [
                        {
                          label: "Sales by age",
                          color: "dark",
                          data: [15, 20, 12, 60, 20, 15],
                        },
                      ],
                    }}
                  />
                </Grid>
                <Grid item lg={6} xs={12}>
                  <Card sx={{ height: "50%", overflow: "hidden", marginBottom: 1 }}>
                    <MDBox
                      p={3}
                      height="100%"
                      bgColor="white"
                      variant="gradient"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        lineHeight={1}
                      >
                        <MDTypography variant="body2" color="text">
                          Export (CSV)
                        </MDTypography>
                        <MDBox mt={-0.5} mr={-1.5}>
                          {exportButton("users")}
                        </MDBox>
                      </MDBox>
                      <Icon fontSize="large" color="white">
                        person
                      </Icon>
                      <MDBox mt={1} lineHeight={1}>
                        <MDTypography variant="body2" color="text" textTransform="capitalize">
                          Users
                        </MDTypography>
                        <MDTypography variant="caption" color="text">
                          {users && users.length}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Card>
                  <Card sx={{ height: "50%", overflow: "hidden", marginTop: 1 }}>
                    <MDBox
                      p={3}
                      height="100%"
                      bgColor="white"
                      variant="gradient"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                        lineHeight={1}
                      >
                        <MDTypography variant="body2" color="text">
                          Export (CSV)
                        </MDTypography>
                        <MDBox mt={-0.5} mr={-1.5}>
                          {exportButton("courses")}
                        </MDBox>
                      </MDBox>
                      <Icon fontSize="large" color="white">
                        class
                      </Icon>
                      <MDBox mt={1} lineHeight={1}>
                        <MDTypography variant="body2" color="text" textTransform="capitalize">
                          Courses
                        </MDTypography>
                        <MDTypography variant="caption" color="text">
                          {courses && courses.length}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MDBox>
      ) : (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </PageLayout>
  );
}

export default PricingPage;
