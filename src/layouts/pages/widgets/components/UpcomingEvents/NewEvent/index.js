/* eslint-disable no-underscore-dangle */
import Modal from "@mui/material/Modal";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { SocketContext } from "context/socket";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import PropTypes from "prop-types";
import { useContext, useState } from "react";

function NewEvent(props) {
  const { open, courseId, onClose } = props;
  const axiosPrivate = useAxiosPrivate();
  const { socket } = useContext(SocketContext);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartDate, setEventStartDate] = useState(Date());
  const [eventStartTime, setEventStartTime] = useState("12:00");
  const [eventEndDate, setEventEndDate] = useState(Date());
  const [eventEndTime, setEventEndTime] = useState("13:00");

  const createEvent = (e) => {
    e.preventDefault();
    const eventStart = new Date(`${eventStartDate}T${eventStartTime}`);
    const eventEnd = new Date(`${eventEndDate}T${eventEndTime}`);

    console.log(eventStart, eventEnd);
    const newEvent = {
      course: courseId,
      title: eventName,
      description: eventDescription,
      start: eventStart,
      end: eventEnd,
    };
    axiosPrivate.post("/events/create", newEvent).then((response) => {
      const eventId = response.data._id;
      const joinUrl = `${window.location.origin}/video-lesson/${eventId}`;
      axiosPrivate.put(`/events/${courseId}/update`, { event: eventId, url: joinUrl });
      const sendEvent = {
        course: courseId,
        title: eventName,
        description: eventDescription,
        start: eventStart,
        end: eventEnd,
        url: joinUrl,
        _id: eventId,
      };
      socket.emit("new-event", sendEvent);
    });
    setEventName("");
    setEventDescription("");
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
      <MDBox component="form" role="form" className="modal-form" onSubmit={createEvent} sx={style}>
        <MDBox id="modal-modal-title">Create new event:</MDBox>
        <MDBox id="modal-modal-description">
          <MDTypography variant="h6" fontWeight="medium">
            Name:
          </MDTypography>
          <MDInput
            lable="Name"
            type="text"
            id="name"
            name="name"
            value={eventName}
            required
            fullWidth
            onChange={(e) => setEventName(e.target.value)}
          />
          <MDTypography variant="h6" fontWeight="medium">
            Description:
          </MDTypography>
          <MDInput
            lable="Description"
            type="text"
            id="description"
            name="description"
            multiline
            rows={5}
            value={eventDescription}
            fullWidth
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <MDTypography variant="h6" fontWeight="medium">
            Start:
          </MDTypography>
          <MDInput
            type="date"
            required
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
          <MDInput
            type="time"
            required
            value={eventStartTime}
            onChange={(e) => setEventStartTime(e.target.value)}
          />
          <MDTypography variant="h6" fontWeight="medium">
            End:
          </MDTypography>
          <MDInput
            type="date"
            required
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
          <MDInput
            type="time"
            required
            value={eventEndTime}
            onChange={(e) => setEventEndTime(e.target.value)}
          />
          <MDButton type="submit">Submit</MDButton>
        </MDBox>
      </MDBox>
    </Modal>
  );
}

NewEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  courseId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewEvent;
