/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

function TableCell({ width, align, padding, noBorder, children }) {
  return (
    <DLBox
      component="th"
      width={width}
      pt={padding[0]}
      pr={padding[1]}
      pb={padding[2]}
      pl={padding[3]}
      textAlign={align}
      sx={{
        border: ({ borders: { borderWidth }, palette: { light } }) =>
          noBorder ? 0 : `${borderWidth[1]} solid ${light.main}`,
      }}
    >
      <DLTypography component="div" variant="body2" color="text">
        {children}
      </DLTypography>
    </DLBox>
  );
}

// Setting default values for the props of TableCell
TableCell.defaultProps = {
  width: "auto",
  align: "left",
  padding: [],
  noBorder: false,
};

// Typechecking props for TableCell
TableCell.propTypes = {
  width: PropTypes.string,
  children: PropTypes.node.isRequired,
  align: PropTypes.string,
  padding: PropTypes.arrayOf(PropTypes.number),
  noBorder: PropTypes.bool,
};

export default TableCell;
