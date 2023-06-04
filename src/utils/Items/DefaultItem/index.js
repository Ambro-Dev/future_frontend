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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// custom styles for the DefaultItem
import { AccordionDetails, AccordionSummary, Avatar, Card, Divider } from "@mui/material";

import exam from "assets/images/event-icons/score.png";
import lesson from "assets/images/event-icons/lesson.png";
import DLButton from "components/DLButton";
import { ExpandMore } from "@mui/icons-material";
import DLAccordion from "components/DLAccordion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("translation", { keyPrefix: "defaultitem" });

    const handleOpen = () => {
      const selectedEvent = {
        title,
        start,
        end,
        description: eventdescription,
        _id: event,
        url,
      };
      navigate("/pages/account/invoice", { state: selectedEvent });
    };
    return (
      <DLBox {...rest} ref={ref} display="flex" alignItems="center">
        <DLAccordion sx={{ width: "100%" }}>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}-content`}>
            <Avatar src={icons[type]} variant="square" alt="listitem" />
            <DLBox ml={2} mt={0.5} lineHeight={1.4}>
              <DLTypography display="block" variant="button" fontWeight="medium">
                {title}
              </DLTypography>
              <DLTypography variant="button" fontWeight="regular" color="text">
                {description}
              </DLTypography>
            </DLBox>
          </AccordionSummary>
          <AccordionDetails>
            <DLBox>
              <Card>
                {/* Invoice header */}
                <DLBox p={1}>
                  <DLBox p={1}>
                    <DLBox width="100%" overflow="auto">
                      <DLTypography variant="h6" color="text" fontWeight="regular">
                        {t("description")}
                      </DLTypography>
                      <DLTypography variant="button" fontWeight="regular">
                        {eventdescription}
                      </DLTypography>
                    </DLBox>
                  </DLBox>
                  <Divider variant="middle" />
                  <DLBox width="100%" textAlign="right" mt={1}>
                    <DLBox mt={1}>
                      <DLTypography component="span" variant="h6" fontWeight="regular" color="text">
                        <DLButton variant="gradient" color="success" onClick={() => handleOpen()}>
                          {t("view")}
                        </DLButton>
                      </DLTypography>
                    </DLBox>
                  </DLBox>
                </DLBox>
              </Card>
            </DLBox>
          </AccordionDetails>
        </DLAccordion>
      </DLBox>
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
