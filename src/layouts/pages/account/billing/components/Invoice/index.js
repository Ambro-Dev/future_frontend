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

function Invoice({ date, id, price, noGutter }) {
  return (
    <DLBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <DLBox lineHeight={1.125}>
        <DLTypography display="block" variant="button" fontWeight="medium">
          {date}
        </DLTypography>
        <DLTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </DLTypography>
      </DLBox>
      <DLBox display="flex" alignItems="center">
        <DLTypography variant="button" fontWeight="regular" color="text">
          {price}
        </DLTypography>
        <DLBox display="flex" alignItems="center" lineHeight={1} ml={3} sx={{ cursor: "pointer" }}>
          <Icon fontSize="small">picture_as_pdf</Icon>
          <DLTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </DLTypography>
        </DLBox>
      </DLBox>
    </DLBox>
  );
}

// Setting default values for the props of Invoice
Invoice.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Invoice
Invoice.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Invoice;
