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

// Distance Learning React context
import { useMaterialUIController } from "context";

function Bill({ name, company, email, vat, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <DLBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <DLBox width="100%" display="flex" flexDirection="column">
        <DLBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <DLTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </DLTypography>

          <DLBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <DLBox mr={1}>
              <DLButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </DLButton>
            </DLBox>
            <DLButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </DLButton>
          </DLBox>
        </DLBox>
        <DLBox mb={1} lineHeight={0}>
          <DLTypography variant="caption" color="text">
            Company Name:&nbsp;&nbsp;&nbsp;
            <DLTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {company}
            </DLTypography>
          </DLTypography>
        </DLBox>
        <DLBox mb={1} lineHeight={0}>
          <DLTypography variant="caption" color="text">
            Email Address:&nbsp;&nbsp;&nbsp;
            <DLTypography variant="caption" fontWeight="medium">
              {email}
            </DLTypography>
          </DLTypography>
        </DLBox>
        <DLTypography variant="caption" color="text">
          VAT Number:&nbsp;&nbsp;&nbsp;
          <DLTypography variant="caption" fontWeight="medium">
            {vat}
          </DLTypography>
        </DLTypography>
      </DLBox>
    </DLBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  vat: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
