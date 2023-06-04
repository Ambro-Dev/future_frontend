/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Billing page components
import Bill from "layouts/pages/account/billing/components/Bill";

function BillingInformation() {
  return (
    <Card id="delete-account">
      <DLBox pt={3} px={2}>
        <DLTypography variant="h6" fontWeight="medium">
          Billing Information
        </DLTypography>
      </DLBox>
      <DLBox pt={1} pb={2} px={2}>
        <DLBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Bill
            name="oliver liam"
            company="viking burrito"
            email="oliver@burrito.com"
            vat="FRB1235476"
          />
          <Bill
            name="lucas harper"
            company="stone tech zone"
            email="lucas@stone-tech.com"
            vat="FRB1235476"
          />
          <Bill
            name="ethan james"
            company="fiber notion"
            email="ethan@fiber.com"
            vat="FRB1235476"
            noGutter
          />
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default BillingInformation;
