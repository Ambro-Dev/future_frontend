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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  return (
    <MDBox>
      <MDBox width="80%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            {t("dateifo")}
          </MDTypography>
        </MDBox>
        <MDTypography variant="body2" color="text">
          {t("datedesc")}
        </MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <FormField
              type="date"
              label={t("startdate")}
              InputLabelProps={{ shrink: true }}
              required
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="time"
              label={t("starttime")}
              InputLabelProps={{ shrink: true }}
              required
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <FormField
              type="date"
              label={t("enddate")}
              InputLabelProps={{ shrink: true }}
              required
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <FormField
              type="time"
              label={t("endtime")}
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
