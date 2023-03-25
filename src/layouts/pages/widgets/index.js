/* eslint-disable react/button-has-type */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useContext, useEffect, useMemo, useState } from "react";

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
import { useNavigate, useParams } from "react-router-dom";
import { SocketContext } from "context/socket";
import MDButton from "components/MDButton";
import useAuth from "hooks/useAuth";
import OrderInfo from "./components/OrderInfo";
import OrderList from "./components/order-list";
import UploadFile from "./components/UploadFile";

// Data

function Widgets() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.id;
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const { socket } = useContext(SocketContext);
  const axiosPrivate = useAxiosPrivate();

  const handleOpen = async (info) => {
    info.jsEvent.preventDefault();
    const selectedEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
      url: info.event.url,
    };
    console.log(info.event);

    navigate("/pages/account/invoice", { state: selectedEvent });
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
            {auth.roles.includes(2001) ? (
              <Grid item xs={12} sm={6} lg={5}>
                <MDButton href="">Edit Course</MDButton>
              </Grid>
            ) : (
              <Grid item xs={12} sm={6} lg={5}>
                <OrderInfo courseId={courseId} />
              </Grid>
            )}
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
