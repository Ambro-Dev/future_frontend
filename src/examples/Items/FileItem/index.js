/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the FileItem
import { Avatar } from "@mui/material";
import MDButton from "components/MDButton";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";

// Icons
import pdf from "assets/images/file-icons/pdf.png";
import doc from "assets/images/file-icons/doc.png";
import jpg from "assets/images/file-icons/jpg.png";
import png from "assets/images/file-icons/png.png";
import txt from "assets/images/file-icons/txt.png";
import xls from "assets/images/file-icons/xls.png";
import zip from "assets/images/file-icons/zip.png";

const icons = {
  pdf,
  docx: doc,
  doc,
  jpg,
  png,
  txt,
  xls,
  xlsx: xls,
  zip,
};

const FileItem = forwardRef(
  ({ color, icon, title, event, eventDel, extension, auth, ...rest }, ref) => (
    <MDBox
      {...rest}
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pb={1}
    >
      <MDBox display="flex" alignItems="center">
        <Avatar src={icons[extension]} variant="square" alt={`${extension} icon`} />
        <MDBox ml={2} mt={0.5} lineHeight={1.4}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            {title}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <MDButton iconOnly onClick={event}>
          <DownloadIcon fontSize="medium" color="info" />
        </MDButton>
        {auth.roles.includes(5150) && (
          <MDButton iconOnly onClick={eventDel}>
            <DeleteIcon fontSize="medium" color="error" />
          </MDButton>
        )}
      </MDBox>
    </MDBox>
  )
);

// Setting default values for the props of FileItem
FileItem.defaultProps = {
  color: "info",
};

// Typechecking props for the FileItem
FileItem.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  event: PropTypes.func.isRequired,
  eventDel: PropTypes.func.isRequired,
  extension: PropTypes.string.isRequired,
};

export default FileItem;
