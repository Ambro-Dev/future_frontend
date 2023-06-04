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

// NewProduct page components
import FormField from "layouts/ecommerce/products/new-product/components/FormField";

function Socials() {
  return (
    <DLBox>
      <DLTypography variant="h5" fontWeight="bold">
        Socials
      </DLTypography>
      <DLBox mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormField type="text" label="Shoppify Handle" />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="Facebook Account" />
          </Grid>
          <Grid item xs={12}>
            <FormField type="text" label="Instagram Account" />
          </Grid>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default Socials;
