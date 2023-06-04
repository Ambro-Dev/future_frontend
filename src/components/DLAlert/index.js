/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Distance Learning React components
import DLBox from "components/DLBox";

// Custom styles for the DLAlert
import DLAlertRoot from "components/DLAlert/DLAlertRoot";
import DLAlertCloseIcon from "components/DLAlert/DLAlertCloseIcon";

function DLAlert({ color, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <DLAlertRoot ownerState={{ color }} {...rest}>
        <DLBox display="flex" alignItems="center" color="white">
          {children}
        </DLBox>
        {dismissible ? (
          <DLAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</DLAlertCloseIcon>
        ) : null}
      </DLAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of DLAlert
DLAlert.defaultProps = {
  color: "info",
  dismissible: false,
};

// Typechecking props of the DLAlert
DLAlert.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default DLAlert;
