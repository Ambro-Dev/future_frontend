/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Autocomplete from "@mui/material/Autocomplete";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLEditor from "components/DLEditor";
import DLInput from "components/DLInput";

// NewProduct page components
import FormField from "layouts/exam-pages/view-page/components/FormField";

function ProductInfo() {
  const [editorValue, setEditorValue] = useState(
    "<p>Some initial <strong>bold</strong> text</p><br><br><br><br>"
  );

  return (
    <DLBox>
      <DLTypography variant="h5">Product Information</DLTypography>
      <DLBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Name" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField type="text" label="Weight" />
          </Grid>
        </Grid>
      </DLBox>
      <DLBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
              <DLTypography component="label" variant="button" fontWeight="regular" color="text">
                Description&nbsp;&nbsp;
                <DLTypography variant="caption" color="text">
                  (optional)
                </DLTypography>
              </DLTypography>
            </DLBox>
            <DLEditor value={editorValue} onChange={setEditorValue} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DLBox mb={3}>
              <DLBox mb={2} display="inline-block">
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
            <DLBox mb={2} display="inline-block">
              <DLTypography
                component="label"
                variant="button"
                fontWeight="regular"
                color="text"
                textTransform="capitalize"
              >
                Size
              </DLTypography>
            </DLBox>
            <Autocomplete
              defaultValue="Medium"
              options={["Extra Large", "Extra Small", "Large", "Medium", "Small"]}
              renderInput={(params) => <DLInput {...params} variant="standard" />}
            />
          </Grid>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default ProductInfo;
