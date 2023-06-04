/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Timeline context
import { useTimeline } from "utils/Timeline/context";

// Custom styles for the TimelineItem
import timelineItem from "utils/Timeline/TimelineItem/styles";

function TimelineItem({ color, icon, title, dateTime, description, lastItem }) {
  const isDark = useTimeline();

  return (
    <DLBox position="relative" mb={3} sx={(theme) => timelineItem(theme, { lastItem, isDark })}>
      <DLBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgColor={color}
        color="white"
        width="2rem"
        height="2rem"
        borderRadius="50%"
        position="absolute"
        top="8%"
        left="2px"
        zIndex={2}
        sx={{ fontSize: ({ typography: { size } }) => size.sm }}
      >
        <Icon fontSize="inherit">{icon}</Icon>
      </DLBox>
      <DLBox ml={5.75} pt={description ? 0.7 : 0.5} lineHeight={0} maxWidth="30rem">
        <DLTypography variant="button" fontWeight="medium" color={isDark ? "white" : "dark"}>
          {title}
        </DLTypography>
        <DLBox mt={0.5}>
          <DLTypography variant="caption" color={isDark ? "secondary" : "text"}>
            {dateTime}
          </DLTypography>
        </DLBox>
        <DLBox mt={2} mb={1.5}>
          {description ? (
            <DLTypography variant="button" color={isDark ? "white" : "dark"}>
              {description}
            </DLTypography>
          ) : null}
        </DLBox>
      </DLBox>
    </DLBox>
  );
}

// Setting default values for the props of TimelineItem
TimelineItem.defaultProps = {
  color: "info",
  lastItem: false,
  description: "",
};

// Typechecking props for the TimelineItem
TimelineItem.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  description: PropTypes.string,
  lastItem: PropTypes.bool,
};

export default TimelineItem;
