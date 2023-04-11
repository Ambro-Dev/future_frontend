/* eslint-disable no-underscore-dangle */
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
import { useTranslation } from "react-i18next";

// Overview page components
import Header from "layouts/pages/profile/components/Header";

import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Backdrop, CircularProgress } from "@mui/material";

function Overview() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(true);
  const [conversationList, setConversationList] = useState();

  useEffect(() => {
    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setPicture(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });

    const fetchUserCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    const fetchTeacherCourses = async () => {
      try {
        const { data } = await axiosPrivate.get(`/users/teacher/${auth.userId}/courses`);
        setCourses(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    if (auth.roles.includes(5150)) {
      fetchTeacherCourses();
    } else {
      fetchUserCourses();
    }

    const getConversations = () => {
      axiosPrivate.get(`conversations/${auth.userId}`).then((response) => {
        if (response.data && response.data.length > 0) {
          const conversationObjects = response.data.map((conversation) => {
            // retrieve messages for conversation and sort by timestamp
            conversation.messages.sort((a, b) => b.timestamp - a.timestamp);

            // extract text of last message and shorten it
            const lastMessage = conversation.messages[0];
            const shortenedDescription = lastMessage?.text?.slice(0, 30) || " ";
            const otherUser = conversation.members.find((member) => member._id !== auth.userId);

            if (!otherUser) {
              return null;
            }

            // create conversation object
            return {
              key: conversation._id,
              user: otherUser._id,
              name: `${otherUser.name} ${otherUser.surname}`,
              description: shortenedDescription,
              action: {
                type: "internal",
                route: "/chat",
                color: "info",
                label: [t("message")],
              },
            };
          });
          setConversationList(conversationObjects.filter(Boolean));
        }
      });
    };
    getConversations();
  }, [i18n]);

  if (!loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox mb={2} />
        <Header picture={picture}>
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={3} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                {auth.studentNumber ? (
                  <ProfileInfoCard
                    title={t("profileInfo")}
                    info={{
                      [t("fullname")]: `${auth.name} ${auth.surname}`,
                      [t("email")]: `${auth.email}`,
                      [t("studentnumber")]: `${auth.studentNumber}`,
                    }}
                    shadow={false}
                  />
                ) : (
                  <ProfileInfoCard
                    title={t("profileInfo")}
                    info={{
                      [t("fullname")]: `${auth.name} ${auth.surname}`,
                      [t("email")]: `${auth.email}`,
                    }}
                    shadow={false}
                  />
                )}
              </Grid>
              <Grid item xs={12} xl={4}>
                {conversationList && conversationList.length > 0 ? (
                  <ProfilesList
                    title={t("conversations")}
                    profiles={conversationList}
                    shadow={false}
                  />
                ) : (
                  <MDBox>{t("noconversations")}</MDBox>
                )}
              </Grid>
            </Grid>
          </MDBox>
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <MDTypography variant="h6" fontWeight="medium">
              {t("courses")}
            </MDTypography>
            <MDBox mb={1}>
              <MDTypography variant="button" color="text">
                {t("allcourses")}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox p={2}>
            {courses.length > 0 ? (
              <Grid container spacing={6}>
                {courses.map((course) => (
                  <Grid item xs={12} md={6} xl={3} key={course._id}>
                    <DefaultProjectCard
                      image={`${serverUrl}/${course.pic}`}
                      title={`${course.name}`}
                      description={`${course.teacherId.name} ${course.teacherId.surname}`}
                      action={{
                        type: "internal",
                        route: `/courses/course-info/${course._id}`,
                        color: "info",
                        label: `${t("gotocourse")}`,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <MDBox>
                <MDTypography>Loading</MDTypography>
              </MDBox>
            )}
          </MDBox>
        </Header>
        <Footer />
      </DashboardLayout>
    );
  }
  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export default Overview;
