/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";
import DLInput from "components/DLInput";
import { useTranslation } from "react-i18next";

function ChangePassword() {
  const { t } = useTranslation("translation", { keyPrefix: "settings" });
  const passwordRequirements = [
    `${t("passreq1")}`,
    `${t("passreq2")}`,
    `${t("passreq3")}`,
    `${t("passreq4")}`,
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <DLBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <DLTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </DLTypography>
      </DLBox>
    );
  });

  return (
    <Card id="change-password">
      <DLBox p={3}>
        <DLTypography variant="h5">{t("changepass")}</DLTypography>
      </DLBox>
      <DLBox component="form" pb={3} px={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DLInput
              fullWidth
              label={t("currpass")}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <DLInput
              fullWidth
              label={t("newpass")}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
          <Grid item xs={12}>
            <DLInput
              fullWidth
              label={t("confpass")}
              inputProps={{ type: "password", autoComplete: "" }}
            />
          </Grid>
        </Grid>
        <DLBox mt={6} mb={1}>
          <DLTypography variant="h5">{t("passreq")}</DLTypography>
        </DLBox>
        <DLBox mb={1}>
          <DLTypography variant="body2" color="text">
            {t("pleasefollow")}
          </DLTypography>
        </DLBox>
        <DLBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <DLBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </DLBox>
          <DLBox ml="auto">
            <DLButton variant="gradient" color="dark" size="small">
              {t("update")}
            </DLButton>
          </DLBox>
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default ChangePassword;
