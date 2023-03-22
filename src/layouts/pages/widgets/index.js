/* eslint-disable react/button-has-type */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useContext, useEffect, useMemo, useRef, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Calendar from "examples/Calendar";

// Widgets page components
import UpcomingEvents from "layouts/pages/widgets/components/UpcomingEvents";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import Modal from "@mui/material/Modal";
import MDTypography from "components/MDTypography";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import { SocketContext } from "context/socket";
import OrderInfo from "./components/OrderInfo";
import OrderList from "./components/order-list";
import UploadFile from "./components/UploadFile";

// Data

function Widgets() {
  const params = useParams();
  const courseId = params.id;
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const { socket } = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const modalRef = useRef();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const handleOpen = async (info) => {
    info.jsEvent.preventDefault();
    setSelectedEvent(info.event);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedEvent(null);
    setOpen(false);
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

  useEffect(() => {
    console.log(courseId);
    // Make API call using Axios
    axiosPrivate
      .get(`/events/${courseId}`)
      .then((response) => {
        // Update state with fetched data
        setCalendarEventsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    socket.emit("join-course", courseId);

    socket.on("event", (event) => {
      setCalendarEventsData((prevEvents) => [...prevEvents, event]);
    });

    return () => {
      socket.emit("leave-course", courseId);
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={5}>
              <OrderInfo courseId={courseId} />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(() => (
              <Calendar
                header={{ title: "calendar" }}
                initialView="dayGridMonth"
                events={calendarEventsData}
                eventClick={handleOpen}
                locale="en"
              />
            ))}
            {selectedEvent && (
              <Modal
                ref={modalRef}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <MDTypography id="modal-modal-title" variant="h6" component="h2">
                    {selectedEvent.title}
                  </MDTypography>
                  <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
                    Start: {selectedEvent?.start?.toLocaleString()}
                  </MDTypography>
                  <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
                    End: {selectedEvent?.end?.toLocaleString()}
                  </MDTypography>
                  <MDTypography id="modal-modal-description" sx={{ mt: 2 }}>
                    Link: {selectedEvent?.url?.toLocaleString()}
                  </MDTypography>
                </Card>
              </Modal>
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            <UpcomingEvents events={calendarEventsData} courseId={courseId} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <UploadFile />
          </Grid>
        </Grid>
      </MDBox>
      <OrderList courseId={courseId} />
      <Footer />
    </DashboardLayout>
  );
}

export default Widgets;
