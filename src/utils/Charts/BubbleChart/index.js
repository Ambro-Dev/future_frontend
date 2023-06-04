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
import { Bubble } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// BubbleChart configurations
import configs from "utils/Charts/BubbleChart/configs";

// Distance Learning React base styles
import colors from "assets/theme/base/colors";

function BubbleChart({ icon, title, description, height, chart }) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 2,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        borderColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        maxBarThickness: 6,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <DLBox py={2} pr={2} pl={icon.component ? 1 : 2}>
      {title || description ? (
        <DLBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
          {icon.component && (
            <DLBox
              width="4rem"
              height="4rem"
              bgColor={icon.color || "info"}
              variant="gradient"
              coloredShadow={icon.color || "info"}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="white"
              mt={-5}
              mr={2}
            >
              <Icon fontSize="medium">{icon.component}</Icon>
            </DLBox>
          )}
          <DLBox mt={icon.component ? -2 : 0}>
            {title && <DLTypography variant="h6">{title}</DLTypography>}
            <DLBox mb={2}>
              <DLTypography component="div" variant="button" color="text">
                {description}
              </DLTypography>
            </DLBox>
          </DLBox>
        </DLBox>
      ) : null}
      {useMemo(
        () => (
          <DLBox height={height}>
            <Bubble data={data} options={options} />
          </DLBox>
        ),
        [chart, height]
      )}
    </DLBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

// Setting default values for the props of BubbleChart
BubbleChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "100%",
};

// Typechecking props for the BubbleChart
BubbleChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default BubbleChart;
