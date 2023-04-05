/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/
import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EventCalendar from "examples/Calendar";

// Calendar application components
import NextEvents from "layouts/applications/calendar/components/NextEvents";

// Data
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Calendar() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const { auth } = useAuth();

  const handleOpen = async (info) => {
    info.jsEvent.preventDefault();
    const selectedEvent = {
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      description: info.event.extendedProps.description,
      _id: info.event.extendedProps._id,
      url: info.event.url,
    };

    navigate("/pages/account/invoice", { state: selectedEvent });
  };

  useEffect(() => {
    axiosPrivate
      .get(`/events/user/${auth.userId}`)
      .then((response) => {
        // Update state with fetched data
        setCalendarEventsData(response.data);
        const currentDateTime = new Date();

        const futureEvents = response.data.filter((event) => {
          const eventStartDate = new Date(event.start); // convert start date to Date object
          return eventStartDate >= currentDateTime; // filter events that start now or in the future
        });
        setNextEvents(futureEvents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>
            {useMemo(
              () => (
                <EventCalendar
                  initialView="dayGridMonth"
                  events={calendarEventsData}
                  eventClick={handleOpen}
                  locale="en"
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} xl={3}>
            <MDBox mb={3}>
              <NextEvents events={nextEvents} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
