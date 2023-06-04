/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

// Invoice page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";

// Distance Learning React context
import { useMaterialUIController } from "context";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";

function Invoice() {
  const { t } = useTranslation("translation", { keyPrefix: "seeevent" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [course, setCourse] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();

  const location = useLocation();
  const selectedEvent = location.state;

  const sendEvent = {
    _id: selectedEvent._id,
  };

  useEffect(() => {
    if (!selectedEvent) {
      navigate("/profile/profile-overview");
    }

    axiosPrivate
      .get(`/courses/${selectedEvent._id}/event`)
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <BaseLayout stickyNavbar>
      <DLBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <DLBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <DLBox
                      component="img"
                      src={course && `${serverUrl}/${course.pic}`}
                      width="25%"
                      p={1}
                      mb={1}
                      sx={{
                        cursor: "pointer",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                      onClick={() => navigate(`/courses/course-info/${course?._id}`)}
                    />
                    <DLTypography variant="h6" fontWeight="medium">
                      {course && course.name}
                    </DLTypography>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <DLBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <DLBox mt={1}>
                        <DLTypography
                          component="span"
                          variant="h6"
                          fontWeight="regular"
                          display="flex"
                          justifyContent="end"
                          color={darkMode ? "text" : "secondary"}
                        >
                          {auth.roles.includes(5150) ? (
                            <>
                              {!selectedEvent.url?.includes("video-lesson") ? (
                                <DLButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/edit-product", {
                                      state: sendEvent,
                                    })
                                  }
                                >
                                  {t("edit")}
                                </DLButton>
                              ) : (
                                <DLButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                >
                                  {t("join")}
                                </DLButton>
                              )}
                              <DLButton variant="gradient" color="error" sx={{ ml: 1 }}>
                                {t("delete")}
                              </DLButton>
                            </>
                          ) : (
                            <DLBox>
                              {selectedEvent.url?.includes("video-lesson") ? (
                                <DLButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                  disabled={new Date(selectedEvent.start) > new Date()} // check if start date is in the future
                                >
                                  {new Date(selectedEvent.start) > new Date()
                                    ? [t("eventnotstarted")]
                                    : [t("join")]}
                                </DLButton>
                              ) : (
                                <DLButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/new-product", {
                                      state: sendEvent,
                                    })
                                  }
                                  disabled={new Date(selectedEvent.start) > new Date()} // check if start date is in the future
                                >
                                  {new Date(selectedEvent.start) > new Date()
                                    ? [t("examnotavailable")]
                                    : [t("joinexam")]}
                                </DLButton>
                              )}
                            </DLBox>
                          )}
                        </DLTypography>
                      </DLBox>
                    </DLBox>
                  </Grid>
                </Grid>
                <DLBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <DLTypography
                        variant="h6"
                        color={darkMode ? "text" : "secondary"}
                        fontWeight="regular"
                      >
                        {t("title")}
                      </DLTypography>
                      <DLTypography variant="h5" fontWeight="medium">
                        {selectedEvent.title}
                      </DLTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <DLBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <DLBox width="50%">
                          <DLTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            {t("start")}
                          </DLTypography>
                        </DLBox>
                        <DLBox width="50%">
                          <DLTypography variant="h6" fontWeight="medium">
                            {selectedEvent.start.toLocaleString("en-US")}
                          </DLTypography>
                        </DLBox>
                      </DLBox>
                      <DLBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <DLBox width="50%">
                          <DLTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            {t("end")}
                          </DLTypography>
                        </DLBox>
                        <DLBox width="50%">
                          <DLTypography variant="h6" fontWeight="medium">
                            {selectedEvent.end.toLocaleString("en-US")}
                          </DLTypography>
                        </DLBox>
                      </DLBox>
                    </Grid>
                  </Grid>
                </DLBox>
              </DLBox>

              {/* Invoice table */}
              <DLBox p={3}>
                <DLBox width="100%" overflow="auto">
                  <DLTypography
                    variant="h6"
                    color={darkMode ? "text" : "secondary"}
                    fontWeight="regular"
                  >
                    {t("description")}
                  </DLTypography>
                  <Divider variant="middle" />
                  <DLTypography variant="button" fontWeight="regular">
                    {selectedEvent.description}
                  </DLTypography>
                </DLBox>
              </DLBox>

              {/* Invoice footer */}
              <DLBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <Divider variant="middle" />
                    <DLTypography variant="h6" fontWeight="regular">
                      {t("files")}
                    </DLTypography>
                    <DLBox mt={1} mb={2} lineHeight={0}>
                      <AttachFileIcon fontSize="large" />
                    </DLBox>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <DLBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <DLButton variant="gradient" color="warning" onClick={handleClick}>
                        {t("close")}
                      </DLButton>
                    </DLBox>
                  </Grid>
                </Grid>
              </DLBox>
            </Card>
          </Grid>
        </Grid>
      </DLBox>
    </BaseLayout>
  );
}

export default Invoice;
