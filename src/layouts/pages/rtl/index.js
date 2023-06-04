/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useEffect, useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import MiniStatisticsCard from "utils/Cards/StatisticsCards/MiniStatisticsCard";
import ProgressLineChart from "utils/Charts/LineCharts/ProgressLineChart";
import DefaultInfoCard from "utils/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "utils/Cards/MasterCard";
import MiniInfoCard from "utils/Cards/InfoCards/MiniInfoCard";
import ControllerCard from "utils/Cards/ControllerCard";
import Calendar from "utils/Calendar";
import CategoriesList from "utils/Lists/CategoriesList";

// RTL page components
import FullBody from "layouts/pages/rtl/components/FullBody";
import MediaPlayer from "layouts/pages/rtl/components/MediaPlayer";
import OrdersOverview from "layouts/pages/rtl/components/OrdersOverview";
import UpcomingEvents from "layouts/pages/rtl/components/UpcomingEvents";

// Data
import progressLineChartData from "layouts/pages/rtl/data/progressLineChartData";
import calendarEventsData from "layouts/pages/rtl/data/calendarEventsData";
import categoriesListData from "layouts/pages/rtl/data/categoriesListData";

// Distance Learning React contexts
import { useMaterialUIController, setDirection } from "context";

function RTL() {
  const [, dispatch] = useMaterialUIController();
  const [lights, setLights] = useState(false);

  const handleSetLights = () => setLights(!lights);

  // Changing the direction to rtl
  useEffect(() => {
    setDirection(dispatch, "rtl");

    return () => setDirection(dispatch, "ltr");
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox my={3}>
        <DLBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <UpcomingEvents />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ProgressLineChart
                icon="date_range"
                title="مهام"
                count={480}
                progress={60}
                height="13.375rem"
                chart={progressLineChartData}
              />
            </Grid>
          </Grid>
        </DLBox>
        <DLBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <DLBox mb={3}>
                <MiniStatisticsCard
                  title={{ text: "صحة البطارية" }}
                  count="99 %"
                  icon={{ color: "info", component: "battery_charging_full" }}
                  direction="left"
                />
              </DLBox>
              <MiniStatisticsCard
                title={{ text: "طبقة صوت الموسيقا" }}
                count="15/100"
                icon={{ color: "info", component: "volume_down" }}
                direction="left"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              lg={5}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <DLBox width="100%" mr={{ xs: 0, sm: 3 }} mb={{ xs: 3, sm: 0 }}>
                <DefaultInfoCard
                  icon="account_balance"
                  title="مرتب"
                  description="تنتمي التفاعلية"
                  value="+$2000"
                />
              </DLBox>
              <DLBox width="100%">
                <DefaultInfoCard
                  icon="paypal"
                  title="باي بال"
                  description="دفع لحسابهم الخاص"
                  value="$455.00"
                />
              </DLBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard number={4562112245947852} holder="جاك بيترسون" expires="11/22" />
            </Grid>
          </Grid>
        </DLBox>
        <DLBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FullBody />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ControllerCard
                state={lights}
                icon={
                  <Icon className={lights ? "text-white" : "text-dark"} fontSize="large">
                    lightbulb
                  </Icon>
                }
                title="درجة حرارة"
                onChange={handleSetLights}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <MiniInfoCard
                icon="shortcut"
                title={
                  <>
                    754&nbsp;
                    <DLTypography variant="button" color="secondary" fontWeight="medium">
                      م
                    </DLTypography>
                  </>
                }
                description="مدينة نيويورك"
              />
            </Grid>
          </Grid>
        </DLBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(
              () => (
                <Calendar
                  header={{ title: "تقويم", date: "Monday, 2021" }}
                  headerToolbar={false}
                  initialView="dayGridMonth"
                  initialDate="2021-08-10"
                  events={calendarEventsData}
                  selectable
                  editable
                />
              ),
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            <DLBox mb={3}>
              <CategoriesList title="فئات" categories={categoriesListData} />
            </DLBox>
            <MediaPlayer />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </DLBox>
      <Footer />
    </DashboardLayout>
  );
}

export default RTL;
