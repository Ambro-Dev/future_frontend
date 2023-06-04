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
import DLBadge from "components/DLBadge";

function FullBody() {
  return (
    <Card sx={{ height: "100%" }}>
      <DLBox display="flex" justifyContent="space-between" alignItems="center" pt={3} mb={2} px={3}>
        <DLTypography variant="body2" color="text">
          Full Body
        </DLTypography>
        <DLBadge variant="contained" color="info" badgeContent="moderate" container />
      </DLBox>
      <DLBox pb={3} px={3}>
        <DLTypography variant="body2" color="text">
          What matters is the people who are sparked by it. And the people who are liked.
        </DLTypography>
      </DLBox>
    </Card>
  );
}

export default FullBody;
