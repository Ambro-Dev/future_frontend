/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

function NewEvent(props) {
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
      <MDBox
        component="form"
        role="form"
        className="modal-form"
        onSubmit={setSelectedAvatar}
        sx={style}
      >
        <MDBox id="modal-modal-title">Choose an avatar:</MDBox>
        <MDBox id="modal-modal-description">
          {imageOptions.map((avatar) => (
            <MDBox
              sx={{ height: 150 }}
              component="img"
              key={avatar}
              src={`${serverUrl}/${avatar}`}
              alt="Avatar"
              onClick={() => handleAvatarClick(avatar)}
              style={{ border: avatar === selectedAvatar ? "2px solid #333" : "none" }}
            />
          ))}
        </MDBox>
        <MDButton onClick={onClose}>Close</MDButton>
      </MDBox>
    </Modal>
  );
}

NewEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  setSelectedAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewEvent;
