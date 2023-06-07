/* eslint-disable no-underscore-dangle */
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
import DLBox from "components/DLBox";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import EventCalendar from "utils/Calendar";

// Data
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";
import NextEvents from "./components/NextEvents";

function Calendar() {
  const { t } = useTranslation("translation", { keyPrefix: "calendar" });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [calendarEventsData, setCalendarEventsData] = useState([]);
  const [nextEvents, setNextEvents] = useState([]);
  const { auth } = useAuth();
  const { showErrorNotification } = useContext(ErrorContext);

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

    navigate("/pages/account/event-info", { state: selectedEvent });
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
        showErrorNotification("Error", error.message);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox pt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} xl={9} sx={{ height: "max-content" }}>
            {useMemo(
              () => (
                <EventCalendar
                  initialView="dayGridMonth"
                  events={calendarEventsData}
                  eventClick={handleOpen}
                  locale={t("locale")}
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} xl={3}>
            <DLBox mb={3}>
              <NextEvents events={nextEvents} />
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
