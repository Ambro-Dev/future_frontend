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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Invoice page components
import BaseLayout from "layouts/pages/account/components/BaseLayout";

// Images
import logoCT from "assets/images/logo-ct.png";
import logoCTDark from "assets/images/logo-ct-dark.png";

// Distance Learning React context
import { useMaterialUIController } from "context";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import useAuth from "hooks/useAuth";

function Invoice() {
  const { auth } = useAuth();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();

  const location = useLocation();
  const selectedEvent = location.state;

  const sendEvent = {
    _id: selectedEvent._id,
  };
  console.log(selectedEvent);

  useEffect(() => {
    if (!selectedEvent) {
      navigate("/profile/profile-overview");
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <BaseLayout stickyNavbar>
      <MDBox mt={{ xs: 4, md: 10 }} mb={{ xs: 4, md: 8 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8}>
            <Card>
              {/* Invoice header */}
              <MDBox p={3}>
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} md={4}>
                    <MDBox
                      component="img"
                      src={darkMode ? logoCT : logoCTDark}
                      width="25%"
                      p={1}
                      mb={1}
                    />
                    <MDTypography variant="h6" fontWeight="medium">
                      Teacher
                    </MDTypography>
                  </Grid>
                  <Grid item xs={12} md={7} lg={3}>
                    <MDBox width="100%" textAlign={{ xs: "left", md: "right" }} mt={6}>
                      <MDBox mt={1}>
                        <MDTypography
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
                                <MDButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/edit-product", {
                                      state: sendEvent,
                                    })
                                  }
                                >
                                  Edit Exam
                                </MDButton>
                              ) : (
                                <MDButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                >
                                  Join call
                                </MDButton>
                              )}
                              <MDButton variant="gradient" color="error" sx={{ ml: 1 }}>
                                Delete Event
                              </MDButton>
                            </>
                          ) : (
                            <MDBox>
                              {selectedEvent.url?.includes("video-lesson") ? (
                                <MDButton
                                  variant="gradient"
                                  color="success"
                                  href={selectedEvent.url}
                                  target="_blank"
                                >
                                  Join call
                                </MDButton>
                              ) : (
                                <MDButton
                                  variant="gradient"
                                  color="success"
                                  onClick={() =>
                                    navigate("/ecommerce/products/new-product", {
                                      state: sendEvent,
                                    })
                                  }
                                >
                                  Join exam
                                </MDButton>
                              )}
                            </MDBox>
                          )}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </Grid>
                </Grid>
                <MDBox mt={{ xs: 5, md: 10 }}>
                  <Grid container justifyContent="space-between">
                    <Grid item xs={12} md={4}>
                      <MDTypography
                        variant="h6"
                        color={darkMode ? "text" : "secondary"}
                        fontWeight="regular"
                      >
                        Title
                      </MDTypography>
                      <MDTypography variant="h5" fontWeight="medium">
                        {selectedEvent.title}
                      </MDTypography>
                    </Grid>
                    <Grid item xs={12} md={7} lg={5}>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                        mt={{ xs: 3, md: 0 }}
                      >
                        <MDBox width="50%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            Start time:
                          </MDTypography>
                        </MDBox>
                        <MDBox width="50%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {selectedEvent.start.toLocaleString("en-US")}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                      <MDBox
                        width="100%"
                        display="flex"
                        flexDirection={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        textAlign={{ xs: "left", md: "right" }}
                      >
                        <MDBox width="50%">
                          <MDTypography
                            variant="h6"
                            color={darkMode ? "text" : "secondary"}
                            fontWeight="regular"
                          >
                            End time:
                          </MDTypography>
                        </MDBox>
                        <MDBox width="50%">
                          <MDTypography variant="h6" fontWeight="medium">
                            {selectedEvent.end.toLocaleString("en-US")}
                          </MDTypography>
                        </MDBox>
                      </MDBox>
                    </Grid>
                  </Grid>
                </MDBox>
              </MDBox>

              {/* Invoice table */}
              <MDBox p={3}>
                <MDBox width="100%" overflow="auto">
                  <MDTypography
                    variant="h6"
                    color={darkMode ? "text" : "secondary"}
                    fontWeight="regular"
                  >
                    Description
                  </MDTypography>
                  <Divider variant="middle" />
                  <MDTypography variant="button" fontWeight="regular">
                    {selectedEvent.description}
                  </MDTypography>
                </MDBox>
              </MDBox>

              {/* Invoice footer */}
              <MDBox p={3} mt={7}>
                <Grid container>
                  <Grid item xs={12} lg={5}>
                    <Divider variant="middle" />
                    <MDTypography variant="h6" fontWeight="regular">
                      Files
                    </MDTypography>
                    <MDBox mt={1} mb={2} lineHeight={0}>
                      <AttachFileIcon fontSize="large" />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} lg={7}>
                    <MDBox
                      width="100%"
                      height={{ xs: "auto", md: "100%" }}
                      display="flex"
                      justifyContent={{ xs: "flex-start", md: "flex-end" }}
                      alignItems="flex-end"
                      mt={{ xs: 2, md: 0 }}
                    >
                      <MDButton variant="gradient" color="warning" onClick={handleClick}>
                        Close
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </BaseLayout>
  );
}

export default Invoice;
