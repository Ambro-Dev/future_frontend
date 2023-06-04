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

function RefundsCell({ value, icon }) {
  return (
    <DLBox display="flex" justifyContent="center" alignItems="center" px={2}>
      <DLTypography variant="button" fontWeight="regular" color="text">
        {value}
      </DLTypography>
      <DLBox color={icon.color} lineHeight={0}>
        <Icon sx={{ fontWeight: "bold" }} fontSize="small">
          {icon.name}
        </Icon>
      </DLBox>
    </DLBox>
  );
}

// Typechecking props for the RefundsCell
RefundsCell.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["info", "success", "warning", "error"]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default RefundsCell;
