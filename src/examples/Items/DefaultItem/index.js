/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the DefaultItem
import { AccordionDetails, AccordionSummary, Avatar, Card, Divider } from "@mui/material";

import exam from "assets/images/event-icons/score.png";
import lesson from "assets/images/event-icons/lesson.png";
import MDButton from "components/MDButton";
import { ExpandMore } from "@mui/icons-material";
import MDAccordion from "components/MDAccordion";
import { useNavigate } from "react-router-dom";

const icons = {
  success: lesson,
  info: exam,
};

const DefaultItem = forwardRef(
  (
    {
      color,
      type,
      title,
      description,
      eventdescription,
      index,
      url,
      classname,
      event,
      start,
      end,
      ...rest
    },
    ref
  ) => {
    const navigate = useNavigate();

    const handleOpen = () => {
      const selectedEvent = {
        title,
        start,
        end,
        description: eventdescription,
        _id: event,
        url,
      };
      console.log(selectedEvent);
      navigate("/pages/account/invoice", { state: selectedEvent });
    };
    return (
      <MDBox {...rest} ref={ref} display="flex" alignItems="center">
        <MDAccordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}-content`}>
            <Avatar src={icons[type]} variant="square" alt="listitem" />
            <MDBox ml={2} mt={0.5} lineHeight={1.4}>
              <MDTypography display="block" variant="button" fontWeight="medium">
                {title}
              </MDTypography>
              <MDTypography variant="button" fontWeight="regular" color="text">
                {description}
              </MDTypography>
            </MDBox>
          </AccordionSummary>
          <AccordionDetails>
            <MDBox>
              <Card>
                {/* Invoice header */}
                <MDBox p={1}>
                  <MDBox p={1}>
                    <MDBox width="100%" overflow="auto">
                      <MDTypography variant="h6" color="text" fontWeight="regular">
                        Description
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="regular">
                        {eventdescription}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <Divider variant="middle" />
                  <MDBox width="100%" textAlign="right" mt={1}>
                    <MDBox mt={1}>
                      <MDTypography component="span" variant="h6" fontWeight="regular" color="text">
                        <MDButton variant="gradient" color="success" onClick={() => handleOpen()}>
                          View
                        </MDButton>
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Card>
            </MDBox>
          </AccordionDetails>
        </MDAccordion>
      </MDBox>
    );
  }
);

// Setting default values for the props of DefaultItem
DefaultItem.defaultProps = {
  color: "info",
  url: null,
};

// Typechecking props for the DefaultItem
DefaultItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eventdescription: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  url: PropTypes.string,
  classname: PropTypes.string.isRequired,
  event: PropTypes.string.isRequired,
};

export default DefaultItem;
