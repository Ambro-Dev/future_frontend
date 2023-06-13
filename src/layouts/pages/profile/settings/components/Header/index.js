/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useEffect, useState, useContext } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";
import Tooltip from "@mui/material/Tooltip";
import DLButton from "components/DLButton";
import Icon from "@mui/material/Icon";
import useAuth from "hooks/useAuth";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { DropzoneDialog } from "mui-file-dropzone";
import ErrorContext from "context/ErrorProvider";

// Images

function Header() {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [picture, setPicture] = useState();
  const [open, setOpen] = useState(false);
  const [imageIrl, setImageUrl] = useState();

  const { showErrorNotification } = useContext(ErrorContext);

  const handleSave = (files) => {
    setPicture(files[0]);
    setOpen(false);
    const formData = new FormData();
    formData.append("picture", files[0]);
    axiosPrivate
      .post(`/profile-picture/users/${auth.userId}/picture`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((error) => showErrorNotification("Error", error.message));
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
        showErrorNotification("Error", error.message);
      });
  }, []);

  return (
    <Card id="profile">
      <DLBox p={2}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <DLBox position="relative" height="max-content" mx="auto">
              {picture ? (
                <DLAvatar
                  src={URL.createObjectURL(picture)}
                  alt="profile picture"
                  size="xxl"
                  variant="rounded"
                />
              ) : (
                <DLAvatar src={imageIrl} alt="profile picture" size="xxl" variant="rounded" />
              )}
              <DLBox alt="spotify logo" position="absolute" left={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <DLButton
                    onClick={handleOpen}
                    variant="gradient"
                    color="info"
                    size="small"
                    component="label"
                    iconOnly
                  >
                    <Icon>edit</Icon>
                  </DLButton>
                </Tooltip>
                <DropzoneDialog
                  open={open}
                  onSave={handleSave}
                  acceptedFiles={["image/jpeg", "image/png", "image/bmp", "image/jpg"]}
                  showPreviews
                  maxFileSize={1000000}
                  onClose={handleClose}
                />
              </DLBox>
            </DLBox>
          </Grid>
          <Grid item>
            <DLBox height="100%" mt={0.5} lineHeight={1}>
              <DLTypography variant="h5" fontWeight="medium">
                {auth.name} {auth.surname}
              </DLTypography>
              <DLTypography variant="button" color="text" fontWeight="medium">
                {auth.studentNumber}
              </DLTypography>
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
    </Card>
  );
}

export default Header;
