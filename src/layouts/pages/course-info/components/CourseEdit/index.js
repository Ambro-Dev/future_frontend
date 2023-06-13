/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";
import DLAvatar from "components/DLAvatar";
import DLBadge from "components/DLBadge";
import PropTypes from "prop-types";

// Images
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import { Icon, Tooltip } from "@mui/material";
import EditCourseImage from "./components/EditCourseIamge";

function CourseEdit({ courseId, setEditing, handleSave, editing, setPicture }) {
  const { t } = useTranslation("translation", { keyPrefix: "courseedit" });
  const [course, setCourse] = useState();
  const axiosPrivate = useAxiosPrivate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [pictureUrl, setPictureUrl] = useState();

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const savePicture = (avatar) => {
    setSelectedAvatar(avatar);
    setPicture(avatar);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}`).then((response) => {
      setCourse(response.data);
      setPictureUrl(`${serverUrl}/${response.data.pic}`);
    });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <DLBox display="flex" alignItems="center">
          <DLBox mr={2} position="relative" height="max-content">
            <DLAvatar
              size="xxl"
              src={selectedAvatar ? `${serverUrl}/${selectedAvatar}` : pictureUrl}
              alt="course image"
              sx={{ width: "100%", height: "auto" }}
              variant="rounded"
            />
            {editing && (
              <DLBox alt="edit-tooltip" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
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
                <EditCourseImage
                  open={isModalOpen}
                  onClose={closeModal}
                  setSelectedAvatar={savePicture}
                />
              </DLBox>
            )}
          </DLBox>
          <DLBox lineHeight={1}>
            <DLTypography variant="h6" fontWeight="medium">
              {course?.name}
            </DLTypography>
            <DLBadge
              variant="gradient"
              color="info"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </DLBox>
        </DLBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        {editing ? (
          <DLButton color="success" onClick={() => handleSave()}>
            {t("save")}
          </DLButton>
        ) : (
          <DLButton onClick={() => setEditing(!editing)}>{t("edit")}</DLButton>
        )}
      </Grid>
    </Grid>
  );
}

CourseEdit.propTypes = {
  courseId: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
  setPicture: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default CourseEdit;
