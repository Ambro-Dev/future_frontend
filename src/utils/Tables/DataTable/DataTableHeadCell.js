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

// Distance Learning React contexts
import { useMaterialUIController } from "context";

function DataTableHeadCell({ width, children, sorted, align, checkbox, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <DLBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
      })}
    >
      {!checkbox ? (
        <DLBox
          {...rest}
          position="relative"
          textAlign={align}
          color={darkMode ? "white" : "secondary"}
          opacity={0.7}
          sx={({ typography: { size, fontWeightBold } }) => ({
            fontSize: size.xxs,
            fontWeight: fontWeightBold,
            textTransform: "uppercase",
            cursor: sorted && "pointer",
            userSelect: sorted && "none",
          })}
        >
          {children}
          {sorted && (
            <DLBox
              position="absolute"
              top={0}
              right={align !== "right" ? "16px" : 0}
              left={align === "right" ? "-5px" : "unset"}
              sx={({ typography: { size } }) => ({
                fontSize: size.lg,
              })}
            >
              <DLBox
                position="absolute"
                top={-6}
                color={sorted === "asce" ? "text" : "secondary"}
                opacity={sorted === "asce" ? 1 : 0.5}
              >
                <Icon>arrow_drop_up</Icon>
              </DLBox>
              <DLBox
                position="absolute"
                top={0}
                color={sorted === "desc" ? "text" : "secondary"}
                opacity={sorted === "desc" ? 1 : 0.5}
              >
                <Icon>arrow_drop_down</Icon>
              </DLBox>
            </DLBox>
          )}
        </DLBox>
      ) : (
        <DLBox
          position="relative"
          textAlign={align}
          color={darkMode ? "white" : "secondary"}
          opacity={0.7}
          sx={({ typography: { size, fontWeightBold } }) => ({
            fontSize: size.xxs,
            fontWeight: fontWeightBold,
            textTransform: "uppercase",
          })}
        >
          {children}
        </DLBox>
      )}
    </DLBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
  checkbox: false,
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
  checkbox: PropTypes.bool,
};

export default DataTableHeadCell;
