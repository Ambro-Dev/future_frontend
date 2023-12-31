/* eslint-disable no-underscore-dangle */
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
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";

function OrderInfo({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "editinfo" });
  const navigate = useNavigate();
  const [imageIrl, setImageUrl] = useState();
  const [teacher, setTeacher] = useState();
  const { showErrorNotification } = useContext(ErrorContext);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}/teacher`).then((response) => {
      setTeacher(response.data);
      axiosPrivate
        .get(`/profile-picture/users/${response.data._id}/picture`, { responseType: "blob" })
        .then((res) => {
          setImageUrl(URL.createObjectURL(res.data));
        })
        .catch((error) => {
          showErrorNotification("Error", error.message);
        });
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
        <DLButton
          variant="gradient"
          color="dark"
          size="small"
          onClick={() => {
            const messageUser = {
              id: teacher._id,
            };
            navigate("/chat", { state: messageUser });
          }}
        >
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
