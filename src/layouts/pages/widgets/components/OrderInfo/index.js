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
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function OrderInfo({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "editinfo" });
  const navigate = useNavigate();
  const [imageIrl, setImageUrl] = useState();
  const { auth } = useAuth();
  const [teacher, setTeacher] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}/teacher`).then((response) => {
      setTeacher(response.data);
    });

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
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDAvatar size="xxl" src={imageIrl} alt="Gold Glasses" />
          </MDBox>
          <MDBox lineHeight={1}>
            <MDTypography variant="h6" fontWeight="medium">
              {teacher?.name} {teacher?.surname}
            </MDTypography>
            <MDBadge
              variant="gradient"
              color="success"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </MDBox>
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <MDButton variant="gradient" color="dark" size="small" onClick={() => navigate("/chat")}>
          {t("sendmessage")}
        </MDButton>
        <MDBox mt={0.5}>
          <MDTypography variant="button" color="text">
            {t("questions")}
          </MDTypography>
        </MDBox>
      </Grid>
    </Grid>
  );
}

OrderInfo.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderInfo;
