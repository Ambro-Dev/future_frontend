/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React contexts
import { useMaterialUIController } from "context";

function DefaultStatisticsCard({ title, count, percentage, dropdown }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card>
      <DLBox p={2}>
        <Grid container>
          <Grid item xs={7}>
            <DLBox mb={0.5} lineHeight={1}>
              <DLTypography
                variant="button"
                fontWeight="medium"
                color="text"
                textTransform="capitalize"
              >
                {title}
              </DLTypography>
            </DLBox>
            <DLBox lineHeight={1}>
              <DLTypography variant="h5" fontWeight="bold">
                {count}
              </DLTypography>
              <DLTypography variant="button" fontWeight="bold" color={percentage.color}>
                {percentage.value}&nbsp;
                <DLTypography
                  variant="button"
                  fontWeight="regular"
                  color={darkMode ? "text" : "secondary"}
                >
                  {percentage.label}
                </DLTypography>
              </DLTypography>
            </DLBox>
          </Grid>
          <Grid item xs={5}>
            {dropdown && (
              <DLBox width="100%" textAlign="right" lineHeight={1}>
                <DLTypography
                  variant="caption"
                  color="secondary"
                  fontWeight="regular"
                  sx={{ cursor: "pointer" }}
                  onClick={dropdown.action}
                >
                  {dropdown.value}
                </DLTypography>
                {dropdown.menu}
              </DLBox>
            )}
          </Grid>
        </Grid>
      </DLBox>
    </Card>
  );
}

// Setting default values for the props of DefaultStatisticsCard
DefaultStatisticsCard.defaultProps = {
  percentage: {
    color: "success",
    value: "",
    label: "",
  },
  dropdown: false,
};

// Typechecking props for the DefaultStatisticsCard
DefaultStatisticsCard.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  dropdown: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      action: PropTypes.func,
      menu: PropTypes.node,
      value: PropTypes.string,
    }),
  ]),
};

export default DefaultStatisticsCard;
