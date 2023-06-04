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

// Distance Learning React utils
import DefaultItem from "utils/Items/DefaultItem";

function UpcomingEvents() {
  return (
    <Card sx={{ height: "100%" }}>
      <DLBox pt={2} px={2} lineHeight={1}>
        <DLTypography variant="h6" fontWeight="medium">
          الأحداث القادمة
        </DLTypography>
        <DLTypography variant="button" color="text" fontWeight="regular">
          انضم
        </DLTypography>
      </DLBox>
      <DLBox p={2}>
        <DefaultItem
          color="dark"
          icon="savings"
          title="أسبوع الإنترنت"
          description="01 يونيو 2021, ي 12:30 PM"
        />
        <DLBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="notifications_active"
            title="لقاء مع ماري"
            description="24 مايو 2021, ي 10:00 PM"
          />
        </DLBox>
        <DLBox mt={2.5}>
          <DefaultItem
            color="dark"
            icon="task"
            title="تخطيط المهمة"
            description="25 مايو 2021, ي 10:00 PM"
          />
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default UpcomingEvents;
