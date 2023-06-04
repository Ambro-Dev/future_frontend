/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// custom styles for the NotificationItem
import menuItem from "utils/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ icon, title, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <DLBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <DLTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </DLTypography>
      <DLTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </DLTypography>
    </DLBox>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default NotificationItem;
