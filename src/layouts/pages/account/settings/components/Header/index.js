/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import Tooltip from "@mui/material/Tooltip";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { DropzoneDialog } from "mui-file-dropzone";

// Images

function Header() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState();
  const [open, setOpen] = useState(false);
  const [imageIrl, setImageUrl] = useState();

  const handleSave = async (files) => {
    setPicture(files[0]);
    setOpen(false);
    const formData = new FormData();
    formData.append("picture", files[0]);
    const response = await axiosPrivate.post(
      `/profile-picture/users/${auth.userId}/picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setImageUrl(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  return (
    <Card id="profile">
      <MDBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDBox position="relative" height="max-content" mx="auto">
              {picture ? (
                <MDAvatar
                  src={URL.createObjectURL(picture)}
                  alt="profile picture"
                  size="xxl"
                  variant="rounded"
                />
              ) : (
                <MDAvatar src={imageIrl} alt="profile picture" size="xxl" variant="rounded" />
              )}
              <MDBox alt="spotify logo" position="absolute" left={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <MDButton
                    onClick={handleOpen}
                    variant="gradient"
                    color="info"
                    size="small"
                    component="label"
                    iconOnly
                  >
                    <Icon>edit</Icon>
                  </MDButton>
                </Tooltip>
                <DropzoneDialog
                  open={open}
                  onSave={handleSave}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/jpg"]}
                  showPreviews
                  maxFileSize={1000000}
                  onClose={handleClose}
                />
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
        </Grid>
      </MDBox>
    </Card>
  );
}

export default Header;
