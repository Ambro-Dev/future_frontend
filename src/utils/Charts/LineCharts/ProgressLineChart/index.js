/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLProgress from "components/DLProgress";

// ProgressLineChart configurations
import configs from "utils/Charts/LineCharts/ProgressLineChart/config";

function ProgressLineChart({ color, icon, title, count, progress, height, chart }) {
  const { data, options } = configs(color, chart.labels || [], title, chart.data || []);

  return (
    <Card>
      <DLBox display="flex" alignItems="center" pt={2} px={2}>
        <DLBox
          width="3rem"
          height="3rem"
          display="grid"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          shadow="md"
          color="white"
          bgColor={color}
          variant="gradient"
        >
          <Icon fontSize="default">{icon}</Icon>
        </DLBox>
        <DLBox ml={2} lineHeight={1}>
          <DLTypography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            color="text"
          >
            {title}
          </DLTypography>
          {count ? (
            <DLTypography variant="h5" fontWeight="bold">
              {count}
            </DLTypography>
          ) : null}
        </DLBox>
        <DLBox width="25%" ml="auto">
          <DLTypography display="block" variant="caption" fontWeight="medium" color="text">
            {progress}%
          </DLTypography>
          <DLBox mt={0.25}>
            <DLProgress variant="gradient" color={color} value={progress} />
          </DLBox>
        </DLBox>
      </DLBox>
      {useMemo(
        () => (
          <DLBox mt={2}>
            <Line data={data} options={options} style={{ height }} />
          </DLBox>
        ),
        [chart, height, color]
      )}
    </Card>
  );
}

// Setting default values for the props of ProgressLineChart
ProgressLineChart.defaultProps = {
  color: "info",
  count: 0,
  height: "6.25rem",
};

// Typechecking props for the ProgressLineChart
ProgressLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  progress: PropTypes.number.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default ProgressLineChart;
