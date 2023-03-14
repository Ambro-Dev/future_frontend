/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const REACT_APP_SERVER_URL = "http://localhost:8080";

function OrderInfo() {
  const [teacher, setTeacher] = useState();
  const axiosPrivate = useAxiosPrivate();
  const serverUrl = REACT_APP_SERVER_URL;
  const [pictureUrl, setPictureUrl] = useState();

  useEffect(() => {
    axiosPrivate.get("/courses/63e98a3f2d8af2d329d36602/teacher").then((response) => {
      setTeacher(response.data);
      setPictureUrl(`${serverUrl}/${response.data.picture}`);
    });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDAvatar size="xxl" src={pictureUrl} alt="Gold Glasses" />
          </MDBox>
          <MDBox lineHeight={1}>
            <MDTypography variant="h6" fontWeight="medium">
              {teacher?.name} {teacher?.surname}
            </MDTypography>
            <MDBadge
              variant="gradient"
              color="success"
              size="xs"
              badgeContent="teacher"
              container
            />
          </MDBox>
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <MDButton variant="gradient" color="dark" size="small">
          send message
        </MDButton>
        <MDBox mt={0.5}>
          <MDTypography variant="button" color="text">
            Have You got any questions?
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default OrderInfo;
