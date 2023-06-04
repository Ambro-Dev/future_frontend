/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";
import DLBadgeDot from "components/DLBadgeDot";
import PieChart from "utils/Charts/PieChart";

// Data
import channelChartData from "layouts/dashboards/sales/components/ChannelsChart/data";

// Distance Learning React contexts
import { useMaterialUIController } from "context";

function ChannelsChart() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%" }}>
      <DLBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
        <DLTypography variant="h6">Channels</DLTypography>
        <Tooltip title="See traffic channels" placement="bottom" arrow>
          <DLButton variant="outlined" color="secondary" size="small" circular iconOnly>
            <Icon>priority_high</Icon>
          </DLButton>
        </Tooltip>
      </DLBox>
      <DLBox mt={3}>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <PieChart chart={channelChartData} height="12.5rem" />
          </Grid>
          <Grid item xs={5}>
            <DLBox pr={1}>
              <DLBox mb={1}>
                <DLBadgeDot color="info" size="sm" badgeContent="Facebook" />
              </DLBox>
              <DLBox mb={1}>
                <DLBadgeDot color="primary" size="sm" badgeContent="Direct" />
              </DLBox>
              <DLBox mb={1}>
                <DLBadgeDot color="dark" size="sm" badgeContent="Organic" />
              </DLBox>
              <DLBox mb={1}>
                <DLBadgeDot color="secondary" size="sm" badgeContent="Referral" />
              </DLBox>
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
      <DLBox
        pt={4}
        pb={2}
        px={2}
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        mt="auto"
      >
        <DLBox width={{ xs: "100%", sm: "60%" }} lineHeight={1}>
          <DLTypography variant="button" color="text" fontWeight="light">
            More than <strong>1,200,000</strong> sales are made using referral marketing, and{" "}
            <strong>700,000</strong> are from social media.
          </DLTypography>
        </DLBox>
        <DLBox width={{ xs: "100%", sm: "40%" }} textAlign="right" mt={{ xs: 2, sm: "auto" }}>
          <DLButton color={darkMode ? "white" : "light"}>read more</DLButton>
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default ChannelsChart;
