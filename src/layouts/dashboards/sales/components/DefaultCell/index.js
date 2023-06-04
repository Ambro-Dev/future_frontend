/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Distance Learning React components
import DLTypography from "components/DLTypography";

function DefaultCell({ children }) {
  return (
    <DLTypography variant="button" fontWeight="regular" color="text">
      {children}
    </DLTypography>
  );
}

// Typechecking props for the DefaultCell
DefaultCell.propTypes = {
  children: PropTypes.string.isRequired,
};

export default DefaultCell;
