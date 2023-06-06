/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";

// NewProduct page components
import FormField from "layouts/exam-pages/view-page/components/FormField";

function Pricing() {
  return (
    <DLBox>
      <DLTypography variant="h5">Pricing</DLTypography>
      <DLBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormField type="text" label="Price" placeholder="99.00" />
          </Grid>
          <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
            <Autocomplete
              defaultValue="USD"
              options={["BTC", "CNY", "EUR", "GBP", "INR", "USD"]}
              renderInput={(params) => <DLInput {...params} variant="standard" />}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormField type="text" label="SKU" placeholder="71283476591" />
          </Grid>
        </Grid>
      </DLBox>
      <DLBox mt={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DLBox my={2} display="inline-block">
              <DLTypography component="label" variant="button" fontWeight="regular" color="text">
                Tags
              </DLTypography>
            </DLBox>
            <Autocomplete
              multiple
              defaultValue={["In Stock", "Out of Stock"]}
              options={["Black Friday", "Expired", "Out of Stock", "In Stock", "Sale"]}
              renderInput={(params) => <DLInput {...params} variant="standard" />}
            />
          </Grid>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default Pricing;
