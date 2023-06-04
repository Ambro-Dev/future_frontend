/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for DLInput
import DLInputRoot from "components/DLInput/DLInputRoot";

const DLInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <DLInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of DLInput
DLInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the DLInput
DLInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DLInput;
