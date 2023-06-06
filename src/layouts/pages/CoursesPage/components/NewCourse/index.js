/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import Modal from "@mui/material/Modal";
import DLBox from "components/DLBox";
import DLButton from "components/DLButton";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function NewEvent(props) {
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
  const { open, setSelectedAvatar, onClose, selectedAvatar } = props;
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    maxWidth: 380,
    minWidth: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
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
        <DLBox id="modal-modal-title">{t("avatar")}</DLBox>
        <DLBox id="modal-modal-description">
          {imageOptions.map((avatar) => (
            <DLBox
              sx={{ height: 150 }}
              component="img"
              key={avatar}
              src={`${serverUrl}/${avatar}`}
              alt="Avatar"
              onClick={() => handleAvatarClick(avatar)}
              style={{ border: avatar === selectedAvatar ? "2px solid #333" : "none" }}
            />
          ))}
        </DLBox>
        <DLButton onClick={onClose}>{t("close")}</DLButton>
      </DLBox>
    </Modal>
  );
}

NewEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  setSelectedAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewEvent;
