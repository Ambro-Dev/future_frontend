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
        <DLBox display="flex" alignItems="center">
          <DLBox mr={2}>
            <DLAvatar size="xxl" src={imageIrl} alt="Gold Glasses" />
          </DLBox>
          <DLBox lineHeight={1}>
            <DLTypography variant="h6" fontWeight="medium">
              {teacher?.name} {teacher?.surname}
            </DLTypography>
            <DLBadge
              variant="gradient"
              color="success"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </DLBox>
        </DLBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <DLButton variant="gradient" color="dark" size="small" onClick={() => navigate("/chat")}>
          {t("sendmessage")}
        </DLButton>
        <DLBox mt={0.5}>
          <DLTypography variant="button" color="text">
            {t("questions")}
          </DLTypography>
        </DLBox>
      </Grid>
    </Grid>
  );
}

OrderInfo.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderInfo;
