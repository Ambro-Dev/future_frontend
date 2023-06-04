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
import Switch from "@mui/material/Switch";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React context
import { useMaterialUIController } from "context";

function ControllerCard({ color, state, icon, title, description, onChange }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ height: "100%", overflow: "hidden" }}>
      <DLBox
        p={3}
        height="100%"
        bgColor={state ? color : "white"}
        variant="gradient"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={({ palette: { background } }) => ({
          background: darkMode && !state && background.card,
        })}
      >
        <DLBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          lineHeight={1}
        >
          <DLTypography variant="body2" color={state ? "white" : "text"}>
            {state ? "On" : "Off"}
          </DLTypography>
          <DLBox mt={-0.5} mr={-1.5}>
            <Switch checked={state} onChange={onChange} />
          </DLBox>
        </DLBox>
        {icon}
        <DLBox mt={1} lineHeight={1}>
          <DLTypography variant="body2" color={state ? "white" : "text"} textTransform="capitalize">
            {title}
          </DLTypography>
          {description ? (
            <DLTypography variant="caption" color={state ? "white" : "text"}>
              {description}
            </DLTypography>
          ) : null}
        </DLBox>
      </DLBox>
    </Card>
  );
}

// Setting default values for the props of ControllerCard
ControllerCard.defaultProps = {
  color: "info",
  state: false,
  description: "",
};

// Typechecking props for the ControllerCard
ControllerCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  state: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ControllerCard;
