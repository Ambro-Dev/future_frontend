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
import DLButton from "components/DLButton";

function Transaction({ color, icon, name, description, value }) {
  return (
    <DLBox key={name} component="li" py={1} pr={2} mb={1}>
      <DLBox display="flex" justifyContent="space-between" alignItems="center">
        <DLBox display="flex" alignItems="center">
          <DLBox mr={2}>
            <DLButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </DLButton>
          </DLBox>
          <DLBox display="flex" flexDirection="column">
            <DLTypography variant="button" fontWeight="medium" gutterBottom>
              {name}
            </DLTypography>
            <DLTypography variant="caption" color="text" fontWeight="regular">
              {description}
            </DLTypography>
          </DLBox>
        </DLBox>
        <DLTypography variant="button" color={color} fontWeight="medium" textGradient>
          {value}
        </DLTypography>
      </DLBox>
    </DLBox>
  );
}

// Typechecking props of the Transaction
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]).isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Transaction;
