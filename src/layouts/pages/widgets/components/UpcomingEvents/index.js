/* eslint-disable react/forbid-prop-types */
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
import { useState } from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import NewEvent from "./NewEvent";

function UpcomingEvents({ events, courseId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Card sx={{ height: "500px", overflow: "auto" }}>
      <MDBox pt={2} px={2} lineHeight={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography variant="h6" fontWeight="medium" pt={1}>
          Events
        </MDTypography>
        <MDButton color="success" circular onClick={openModal}>
          Add Event
        </MDButton>
        <NewEvent open={isModalOpen} courseId={courseId} onClose={closeModal} />
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
  events: PropTypes.array.isRequired,
  courseId: PropTypes.string.isRequired,
};

export default UpcomingEvents;
