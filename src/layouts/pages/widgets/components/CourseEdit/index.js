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
import PropTypes from "prop-types";

// Images
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";

function CourseEdit({ courseId, setEditing, handleSave, editing }) {
  const { t } = useTranslation("translation", { keyPrefix: "courseedit" });
  const [course, setCourse] = useState();
  const axiosPrivate = useAxiosPrivate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [pictureUrl, setPictureUrl] = useState();

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}`).then((response) => {
      setCourse(response.data);
      setPictureUrl(`${serverUrl}/${response.data.pic}`);
    });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDAvatar size="xxl" src={pictureUrl} alt="course image" />
          </MDBox>
          <MDBox lineHeight={1}>
            <MDTypography variant="h6" fontWeight="medium">
              {course?.name}
            </MDTypography>
            <MDBadge
              variant="gradient"
              color="info"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </MDBox>
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        {editing ? (
          <MDButton color="success" onClick={handleSave}>
            {t("save")}
          </MDButton>
        ) : (
          <MDButton onClick={setEditing}>{t("edit")}</MDButton>
        )}
      </Grid>
    </Grid>
  );
}

CourseEdit.propTypes = {
  courseId: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default CourseEdit;
