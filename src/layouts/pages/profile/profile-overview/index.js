/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/pages/profile/components/Header";

// Data
import profilesListData from "layouts/pages/profile/profile-overview/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import team1 from "assets/images/team-1.jpg";

import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

function Overview() {
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCourses();
  }, [auth.userId]);

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={3} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile information"
                  info={{
                    fullName: `${auth.name} ${auth.surname}`,
                    email: `${auth.email}`,
                    studentNumber: `${auth.studentNumber}`,
                  }}
                  shadow={false}
                />
              </Grid>
              <Grid item xs={12} xl={4}>
                <ProfilesList title="conversations" profiles={profilesListData} shadow={false} />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              Courses
            </MDTypography>
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                All my Courses
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox p={2}>
            {courses.length > 0 && (
              <Grid container spacing={6}>
                {courses.map((course) => (
                  <Grid item xs={12} md={6} xl={3} key={course.name}>
                    <DefaultProjectCard
                      image={homeDecor1}
                      lable={`${course.groupIds.name}`}
                      title={`${course.name}`}
                      description={`${course.teacherId.name}`}
                      action={{
                        type: "internal",
                        route: "/pages/profile/profile-overview",
                        color: "info",
                        label: "view project",
                      }}
                      authors={[{ image: team1, name: `` }]}
                    />
                    {course.groupIds.map((group) => (
                      <p key={group.studentIds.studentNumber}>
                        {console.log(group.studentIds.name)}
                      </p>
                    ))}
                  </Grid>
                ))}
              </Grid>
            )}
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Footer />
    </DashboardLayout>
  );
}
export default Overview;
