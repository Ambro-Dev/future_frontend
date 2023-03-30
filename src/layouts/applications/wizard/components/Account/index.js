/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import PropTypes from "prop-types";

function Account({ setClassName }) {
  const [design, setDesign] = useState(true);
  const [code, setCode] = useState(false);

  const handleSetDesign = () => {
    setDesign(!design);
    if (code) setCode(!code);
    setClassName("success");
  };
  const handleSetCode = () => {
    setCode(!code);
    if (design) setDesign(!design);
    setClassName("info");
  };

  const customButtonStyles = ({
    functions: { pxToRem, rgba },
    borders: { borderWidth },
    palette: { transparent, info },
    typography: { size },
  }) => ({
    width: pxToRem(164),
    height: pxToRem(130),
    borderWidth: borderWidth[2],
    mb: 1,
    ml: 0.5,

    "&.MuiButton-contained, &.MuiButton-contained:hover": {
      boxShadow: "none",
      border: `${borderWidth[2]} solid ${transparent.main}`,
    },

    "&:hover": {
      backgroundColor: `${transparent.main} !important`,
      border: `${borderWidth[2]} solid ${info.main} !important`,
      color: rgba(info.main, 0.75),
    },

    "& .material-icons-round": {
      fontSize: `${size["3xl"]} !important`,
    },
  });

  return (
    <MDBox>
      <MDBox width="80%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            What type of event You want to create?
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <MDBox textAlign="center">
              <MDButton
                color="info"
                variant={design ? "contained" : "outlined"}
                onClick={handleSetDesign}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: design ? "white" : "inherit" }}>video_call</Icon>
              </MDButton>
              <MDTypography variant="h6" sx={{ mt: 1 }}>
                Video Lesson
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <MDBox textAlign="center">
              <MDButton
                color="info"
                variant={code ? "contained" : "outlined"}
                onClick={handleSetCode}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: code ? "white" : "inherit" }}>grading</Icon>
              </MDButton>
              <MDTypography variant="h6" sx={{ mt: 1 }}>
                Exam
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

Account.propTypes = {
  setClassName: PropTypes.func.isRequired,
};

export default Account;
