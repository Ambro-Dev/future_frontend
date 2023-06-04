/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
// import DLButton from "components/DLButton";

// Billing page components
import Transaction from "layouts/pages/account/billing/components/Transaction";

function Transactions() {
  return (
    <Card sx={{ height: "100%" }}>
      <DLBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <DLTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Your Transaction&apos;s
        </DLTypography>
        <DLBox display="flex" alignItems="flex-start">
          <DLBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </DLBox>
          <DLTypography variant="button" color="text" fontWeight="regular">
            23 - 30 March 2020
          </DLTypography>
        </DLBox>
      </DLBox>
      <DLBox pt={3} pb={2} px={2}>
        <DLBox mb={2}>
          <DLTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            newest
          </DLTypography>
        </DLBox>
        <DLBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="Netflix"
            description="27 March 2020, at 12:30 PM"
            value="- $ 2,500"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Apple"
            description="27 March 2020, at 04:30 AM"
            value="+ $ 2,000"
          />
        </DLBox>
        <DLBox mt={1} mb={2}>
          <DLTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            yesterday
          </DLTypography>
        </DLBox>
        <DLBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="success"
            icon="expand_less"
            name="Stripe"
            description="26 March 2020, at 13:45 PM"
            value="+ $ 750"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="HubSpot"
            description="26 March 2020, at 12:30 PM"
            value="+ $ 1,000"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="MANS"
            description="26 March 2020, at 08:30 AM"
            value="+ $ 2,500"
          />
          <Transaction
            color="dark"
            icon="priority_high"
            name="Webflow"
            description="26 March 2020, at 05:00 AM"
            value="Pending"
          />
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default Transactions;
