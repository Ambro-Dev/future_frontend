/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";

// NewProduct page components
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";

function Pricing() {
  return (
    <Card sx={{ overflow: "visible" }}>
      <DLBox p={3}>
        <DLTypography variant="h5" fontWeight="bold">
          Pricing
        </DLTypography>
        <DLBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="number" label="Price" defaultValue="99.00" />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ mt: 2 }}>
              <Autocomplete
                defaultValue="USD"
                options={["BTC", "CNY", "EUR", "GBP", "INR", "USD"]}
                renderInput={(params) => <DLInput {...params} variant="standard" />}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <FormField type="text" label="SKU" defaultValue="71283476591" />
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
    </Card>
  );
}

export default Pricing;
