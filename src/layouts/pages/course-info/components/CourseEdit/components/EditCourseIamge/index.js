/* eslint-disable no-underscore-dangle */
import { Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import DLBox from "components/DLBox";
import DLButton from "components/DLButton";
import DLTypography from "components/DLTypography";
import PropTypes from "prop-types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function EditCourseImage(props) {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const imageOptions = [
    "/storage/courses/course_images/course_image_01.jpg",
    "/storage/courses/course_images/course_image_02.gif",
    "/storage/courses/course_images/course_image_03.gif",
    "/storage/courses/course_images/course_image_04.gif",
    "/storage/courses/course_images/course_image_05.gif",
    "/storage/courses/course_images/course_image_06.gif",
    "/storage/courses/course_images/course_image_07.gif",
    "/storage/courses/course_images/course_image_08.gif",
    "/storage/courses/course_images/course_image_09.gif",
    "/storage/courses/course_images/course_image_10.gif",
    "/storage/courses/course_images/course_image_11.gif",
    "/storage/courses/course_images/course_image_12.gif",
  ];
  const [avatarSelect, setAvatarSelect] = useState(null);
  const { open, setSelectedAvatar, onClose } = props;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    maxWidth: 800,
    background: "#f0f2f5",
    p: 4,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <DLBox
        component="form"
        role="form"
        className="modal-form"
        onSubmit={setSelectedAvatar}
        sx={style}
      >
        <DLBox id="modal-modal-title" textAlign="center" mb={2}>
          <DLTypography variant="button" fontWeight="medium" sx={{ fontSize: 20 }}>
            {t("avatar")}
          </DLTypography>
        </DLBox>
        <DLBox id="modal-modal-description" sx={{ overflow: "auto", maxHeight: 400 }}>
          <Grid container spacing={1}>
            {imageOptions.map((avatar) => (
              <Grid item key={avatar} xs={12} md={6} xl={4}>
                <DLBox
                  component="img"
                  src={`${serverUrl}/${avatar}`}
                  alt="Avatar"
                  onClick={() => setAvatarSelect(avatar)}
                  sx={{
                    border: avatar === avatarSelect ? "2px solid #1A73E8" : "none",
                    width: "100%",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DLBox>
        <DLBox mt={2} display="flex" justifyContent="space-around">
          <DLButton onClick={onClose} variant="text" color="info">
            {t("close")}
          </DLButton>
          <DLButton
            onClick={() => {
              setSelectedAvatar(avatarSelect);
              onClose();
            }}
            variant="text"
            color="success"
            disabled={!avatarSelect}
          >
            Save
          </DLButton>
        </DLBox>
      </DLBox>
    </Modal>
  );
}

EditCourseImage.propTypes = {
  open: PropTypes.bool.isRequired,
  setSelectedAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditCourseImage;
