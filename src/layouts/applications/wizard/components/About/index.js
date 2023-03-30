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
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Wizard application components
import FormField from "layouts/applications/wizard/components/FormField";

function About({ setDescription, setName, name, description }) {
  return (
    <MDBox>
      <MDBox width="82%" textAlign="center" mx="auto" my={4}>
        <MDBox mb={1}>
          <MDTypography variant="h5" fontWeight="regular">
            Let&apos;s start with the basic information
          </MDTypography>
        </MDBox>
        <MDTypography variant="body2" color="text">
          Add course name and description
        </MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid item xs={12} sm={12}>
          <MDBox mb={2}>
            <FormField
              type="text"
              label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </MDBox>
          <MDBox mb={2}>
            <FormField
              type="text"
              label="Description"
              multiline
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </MDBox>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default About;
