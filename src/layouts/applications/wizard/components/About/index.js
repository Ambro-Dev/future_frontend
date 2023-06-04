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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";
import { useTranslation } from "react-i18next";

function About({ setDescription, setName, name, description }) {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  return (
    <DLBox>
      <DLBox width="82%" textAlign="center" mx="auto" my={4}>
        <DLBox mb={1}>
          <DLTypography variant="h5" fontWeight="regular">
            {t("infostart")}
          </DLTypography>
        </DLBox>
        <DLTypography variant="body2" color="text">
          {t("infodesc")}
        </DLTypography>
      </DLBox>
      <DLBox mt={2}>
        <Grid item xs={12} sm={12}>
          <DLBox mb={2}>
            <FormField
              type="text"
              label={t("infoname")}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DLBox>
          <DLBox mb={2}>
            <FormField
              type="text"
              label={t("infodescription")}
              multiline
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DLBox>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default About;
