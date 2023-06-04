/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLEditor from "components/DLEditor";
import DLInput from "components/DLInput";

// NewProduct page components
import FormField from "layouts/ecommerce/products/edit-product/components/FormField";

function ProductInfo() {
  const [editorValue, setEditorValue] = useState(
    `<p>
      Long sleeves black denim jacket with a twisted design. Contrast stitching. Button up closure. White arrow prints on the back.
    </p>`
  );

  return (
    <Card>
      <DLBox p={3}>
        <DLTypography variant="h5">Product Information</DLTypography>
        <DLBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormField type="text" label="Name" defaultValue="Minimal Bar Stool" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormField type="number" label="Weight" defaultValue={2} />
            </Grid>
          </Grid>
        </DLBox>
        <DLBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Collection" defaultValue="Summer" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="text" label="Price" defaultValue="$90" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormField type="number" label="Quantity" defaultValue={50} />
            </Grid>
          </Grid>
        </DLBox>
        <DLBox mt={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                <DLTypography component="label" variant="button" fontWeight="regular" color="text">
                  Description&nbsp;&nbsp;
                  <DLTypography variant="caption" fontWeight="regular" color="text">
                    (optional)
                  </DLTypography>
                </DLTypography>
              </DLBox>
              <DLEditor value={editorValue} onChange={setEditorValue} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DLBox mb={3}>
                <DLBox mb={1.625} display="inline-block">
                  <DLTypography
                    component="label"
                    variant="button"
                    fontWeight="regular"
                    color="text"
                    textTransform="capitalize"
                  >
                    Category
                  </DLTypography>
                </DLBox>
                <Autocomplete
                  defaultValue="Clothing"
                  options={["Clothing", "Electronics", "Furniture", "Others", "Real Estate"]}
                  renderInput={(params) => <DLInput {...params} variant="standard" />}
                />
              </DLBox>
              <DLBox mb={1.625} display="inline-block">
                <DLTypography
                  component="label"
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  textTransform="capitalize"
                >
                  Color
                </DLTypography>
              </DLBox>
              <Autocomplete
                defaultValue="Black"
                options={["Black", "Blue", "Green", "Orange", "White"]}
                renderInput={(params) => <DLInput {...params} variant="standard" />}
              />
            </Grid>
          </Grid>
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default ProductInfo;
