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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// custom styles for the FileItem
import { Avatar } from "@mui/material";
import DLButton from "components/DLButton";
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
    <DLBox
      {...rest}
      ref={ref}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      pb={1}
    >
      <DLBox display="flex" alignItems="center">
        <Avatar src={icons[extension]} variant="square" alt={`${extension} icon`} />
        <DLBox ml={2} mt={0.5} lineHeight={1.4}>
          <DLTypography display="block" variant="button" fontWeight="medium">
            {title}
          </DLTypography>
        </DLBox>
      </DLBox>
      <DLBox>
        <DLButton iconOnly onClick={event}>
          <DownloadIcon fontSize="medium" color="info" />
        </DLButton>
        {auth.roles.includes(5150) && (
          <DLButton iconOnly onClick={eventDel}>
            <DeleteIcon fontSize="medium" color="error" />
          </DLButton>
        )}
      </DLBox>
    </DLBox>
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
