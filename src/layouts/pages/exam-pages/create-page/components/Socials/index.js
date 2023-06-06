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

// EditProduct page components
import FormField from "layouts/exam-pages/create-page/components/FormField";

function Socials() {
  return (
    <Card>
      <DLBox p={3}>
        <DLTypography variant="h5" fontWeight="bold">
          Socials
        </DLTypography>
        <DLBox mt={1}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormField type="text" label="Shoppify Handle" defaultValue="@soft" />
            </Grid>
            <Grid item xs={12}>
              <FormField type="text" label="Facebook Account" defaultValue="https://..." />
            </Grid>
            <Grid item xs={12}>
              <FormField type="text" label="Instagram Account" defaultValue="https://..." />
            </Grid>
          </Grid>
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default Socials;
