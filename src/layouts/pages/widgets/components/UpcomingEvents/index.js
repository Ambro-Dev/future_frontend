/* eslint-disable no-underscore-dangle */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Distance Learning React examples
import DefaultItem from "examples/Items/DefaultItem";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import PropTypes from "prop-types";

function UpcomingEvents({ courseId }) {
  const [events, setEvents] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/events/${courseId}`).then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <Card sx={{ height: "500px", overflow: "auto" }}>
      <MDBox pt={2} px={2} lineHeight={1}>
        <MDTypography variant="h6" fontWeight="medium">
          Events
        </MDTypography>
      </MDBox>
      {events && events.length > 0 ? (
        events.map((event) => {
          const formattedStartDate = new Date(event.start).toLocaleDateString("us-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedStartTime = new Date(event.start).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          });
          const formattedEndDate = new Date(event.end).toLocaleDateString("us-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
          const formattedEndTime = new Date(event.end).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: false,
          });
          return (
            <MDBox p={2} key={event._id}>
              <DefaultItem
                color="dark"
                icon="savings"
                title={event.title}
                description={`${formattedStartDate} ${formattedStartTime} - ${formattedEndDate} ${formattedEndTime}`}
              />
            </MDBox>
          );
        })
      ) : (
        <MDBox p={2}>No events yet</MDBox>
      )}
    </Card>
  );
}

UpcomingEvents.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default UpcomingEvents;
