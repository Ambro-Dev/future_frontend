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
          جسم كامل
        </DLTypography>
        <DLBadge variant="contained" color="info" badgeContent="معتدل" container />
      </DLBox>
      <DLBox pb={3} px={3}>
        <DLTypography variant="body2" color="text">
          ما يهم هو الأشخاص الذين أوقدوه. والناس الذين يشبهونهم مستاءون منه.
        </DLTypography>
      </DLBox>
    </Card>
  );
}

export default FullBody;
