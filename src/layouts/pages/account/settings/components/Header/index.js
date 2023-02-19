/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import defaultPicture from "assets/images/default.png";

const REACT_APP_SERVER_URL = "http://localhost:8080";

// Images

function Header() {
  const ServerUrl = REACT_APP_SERVER_URL;
  const [visible, setVisible] = useState(true);
  const { auth } = useAuth();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState(defaultPicture);

  const handleSetVisible = () => setVisible(!visible);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axiosPrivate
        .post(`/users/${auth.userId}/profile-picture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
        });

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth.picture) setPicture(`${ServerUrl}/${auth.picture}`);
  }, [auth.picture]);

  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDBox position="relative" height="max-content" mx="auto">
              <MDAvatar src={picture} alt="profile picture" size="xxl" variant="rounded" />
              <MDBox alt="spotify logo" position="absolute" left={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <MDButton variant="gradient" color="info" size="small" component="label" iconOnly>
                    <Icon>edit</Icon>
                    <input hidden accept="image/*" onChange={handleFileUpload} type="file" />
                  </MDButton>
                </Tooltip>
              </MDBox>
              <MDBox alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={handleSubmit}
                    component="label"
                    iconOnly
                  >
                    <Icon>save</Icon>
                  </MDButton>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {auth.name} {auth.surname}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="medium">
                {auth.studentNumber}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
            <MDBox
              display="flex"
              justifyContent={{ md: "flex-end" }}
              alignItems="center"
              lineHeight={1}
            >
              <MDTypography variant="caption" fontWeight="regular">
                Switch to {visible ? "invisible" : "visible"}
              </MDTypography>
              <MDBox ml={1}>
                <Switch checked={visible} onChange={handleSetVisible} disabled={loading} />
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
