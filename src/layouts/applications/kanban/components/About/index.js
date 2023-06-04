/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLAvatar from "components/DLAvatar";
import DLButton from "components/DLButton";

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import NewEvent from "../NewCourse";

// Images

function About({ setDescription, setName, name, description, setPic }) {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const savePicture = (avatar) => {
    setPic(avatar);
    setSelectedAvatar(avatar);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <DLBox sx={{ my: 4 }}>
      <DLBox width="82%" textAlign="center" mx="auto" my={4}>
        <DLBox mb={1}>
          <DLTypography variant="h5" fontWeight="regular">
            {t("courseinfo")}
          </DLTypography>
        </DLBox>
        <DLTypography variant="body2" color="text">
          {t("courseimage")}
        </DLTypography>
      </DLBox>
      <DLBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} container justifyContent="center">
            <DLBox position="relative" height="max-content" mx="auto">
              <DLAvatar
                src={
                  selectedAvatar
                    ? `${serverUrl}/${selectedAvatar}`
                    : `${serverUrl}/storage/courses/course_images/course_image_11.gif`
                }
                alt="profile picture"
                size="xxl"
                variant="rounded"
              />
              <DLBox alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <DLButton
                    variant="gradient"
                    color="info"
                    size="small"
                    iconOnly
                    onClick={openModal}
                  >
                    <Icon>edit</Icon>
                  </DLButton>
                </Tooltip>
                <NewEvent open={isModalOpen} onClose={closeModal} setSelectedAvatar={savePicture} />
              </DLBox>
            </DLBox>
          </Grid>
          <Grid item xs={12} sm={12}>
            <DLBox mb={2}>
              <FormField
                type="text"
                label={t("coursename")}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </DLBox>
            <DLBox mb={2}>
              <FormField
                type="text"
                label={t("coursedesc")}
                multiline
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default About;
