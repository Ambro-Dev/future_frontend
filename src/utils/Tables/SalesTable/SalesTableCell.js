/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import TableCell from "@mui/material/TableCell";

// Distance Learning React components
import DLTypography from "components/DLTypography";
import DLBox from "components/DLBox";

function SalesTableCell({ title, content, image, noBorder, ...rest }) {
  let template;

  if (image) {
    template = (
      <TableCell {...rest} align="left" width="30%" sx={{ border: noBorder && 0 }}>
        <DLBox display="flex" alignItems="center" width="max-content">
          <DLBox component="img" src={image} alt={content} width="1.5rem" height="auto" />{" "}
          <DLBox display="flex" flexDirection="column" ml={3}>
            <DLTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textTransform="capitalize"
            >
              {title}:
            </DLTypography>
            <DLTypography variant="button" fontWeight="regular" textTransform="capitalize">
              {content}
            </DLTypography>
          </DLBox>
        </DLBox>
      </TableCell>
    );
  } else {
    template = (
      <TableCell {...rest} align="center" sx={{ border: noBorder && 0 }}>
        <DLBox display="flex" flexDirection="column">
          <DLTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textTransform="capitalize"
          >
            {title}:
          </DLTypography>
          <DLTypography variant="button" fontWeight="regular" textTransform="capitalize">
            {content}
          </DLTypography>
        </DLBox>
      </TableCell>
    );
  }

  return template;
}

// Setting default values for the props of SalesTableCell
SalesTableCell.defaultProps = {
  image: "",
  noBorder: false,
};

// Typechecking props for the SalesTableCell
SalesTableCell.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  noBorder: PropTypes.bool,
};

export default SalesTableCell;
