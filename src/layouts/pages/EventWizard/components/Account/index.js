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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function Account({ setClassName }) {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
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
    <DLBox>
      <DLBox width="80%" textAlign="center" mx="auto" my={4}>
        <DLBox mb={1}>
          <DLTypography variant="h5" fontWeight="regular">
            {t("typeofevent")}
          </DLTypography>
        </DLBox>
      </DLBox>
      <DLBox mt={2}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={3}>
            <DLBox textAlign="center">
              <DLButton
                color="info"
                variant={design ? "contained" : "outlined"}
                onClick={handleSetDesign}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: design ? "white" : "inherit" }}>video_call</Icon>
              </DLButton>
              <DLTypography variant="h6" sx={{ mt: 1 }}>
                {t("videolesson")}
              </DLTypography>
            </DLBox>
          </Grid>
          <Grid item xs={12} sm={3}>
            <DLBox textAlign="center">
              <DLButton
                color="info"
                variant={code ? "contained" : "outlined"}
                onClick={handleSetCode}
                sx={customButtonStyles}
              >
                <Icon sx={{ color: code ? "white" : "inherit" }}>grading</Icon>
              </DLButton>
              <DLTypography variant="h6" sx={{ mt: 1 }}>
                {t("exam")}
              </DLTypography>
            </DLBox>
          </Grid>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

Account.propTypes = {
  setClassName: PropTypes.func.isRequired,
};

export default Account;
