/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import FormField from "../FormField";

// Wizard application components

function Address({
  setEventEndDate,
  setEventEndTime,
  setEventStartDate,
  setEventStartTime,
  eventStartDate,
  eventEndDate,
  eventEndTime,
  eventStartTime,
}) {
  return (
    <MDBox>
      <MDBox width="80%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            Are you living in a nice area?
          </MDTypography>
        </MDBox>
        <MDTypography variant="body2" color="text">
          One thing I love about the later sunsets is the chance to go for a walk through the
          neighborhood woods before dinner
        </MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <FormField
              type="date"
              label="Start date"
              InputLabelProps={{ shrink: true }}
              required
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="time"
              label="Start time"
              InputLabelProps={{ shrink: true }}
              required
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <FormField
              type="date"
              label="End date"
              InputLabelProps={{ shrink: true }}
              required
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="time"
              label="End time"
              InputLabelProps={{ shrink: true }}
              required
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Address;
