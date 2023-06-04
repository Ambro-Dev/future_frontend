/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";
import DLBadge from "components/DLBadge";
import DLInput from "components/DLInput";

function ProductInfo() {
  return (
    <DLBox>
      <DLBox mb={1}>
        <DLTypography variant="h3" fontWeight="bold">
          Minimal Bar Stool
        </DLTypography>
      </DLBox>
      <DLTypography variant="h4" color="text">
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star</Icon>
        <Icon>star_half</Icon>
      </DLTypography>
      <DLBox mt={1}>
        <DLTypography variant="h6" fontWeight="medium">
          Price
        </DLTypography>
      </DLBox>
      <DLBox mb={1}>
        <DLTypography variant="h5" fontWeight="medium">
          $1,419
        </DLTypography>
      </DLBox>
      <DLBadge variant="contained" color="success" badgeContent="in stock" container />
      <DLBox mt={3} mb={1} ml={0.5}>
        <DLTypography variant="button" fontWeight="regular" color="text">
          Description
        </DLTypography>
      </DLBox>
      <DLBox component="ul" m={0} pl={4} mb={2}>
        <DLBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <DLTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            The most beautiful curves of this swivel stool adds an elegant touch to any environment
          </DLTypography>
        </DLBox>
        <DLBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <DLTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Memory swivel seat returns to original seat position
          </DLTypography>
        </DLBox>
        <DLBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <DLTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Comfortable integrated layered chair seat cushion design
          </DLTypography>
        </DLBox>
        <DLBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
          <DLTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
            Fully assembled! No assembly required
          </DLTypography>
        </DLBox>
      </DLBox>
      <DLBox mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            <DLBox mb={1.5} lineHeight={0} display="inline-block">
              <DLTypography component="label" variant="button" color="text" fontWeight="regular">
                Frame Material
              </DLTypography>
            </DLBox>
            <Autocomplete
              defaultValue="Steel"
              options={["Aluminium", "Carbon", "Steel", "Wood"]}
              renderInput={(params) => <DLInput {...params} variant="standard" />}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <DLBox mb={1.5} lineHeight={0} display="inline-block">
              <DLTypography component="label" variant="button" color="text" fontWeight="regular">
                Color
              </DLTypography>
            </DLBox>
            <Autocomplete
              defaultValue="White"
              options={["Black", "Blue", "Grey", "Pink", "Red", "White"]}
              renderInput={(params) => <DLInput {...params} variant="standard" />}
            />
          </Grid>
          <Grid item xs={12} lg={2}>
            <DLBox mb={1.5} lineHeight={0} display="inline-block">
              <DLTypography component="label" variant="button" color="text" fontWeight="regular">
                Quantity
              </DLTypography>
            </DLBox>
            <DLInput inputProps={{ type: "number" }} defaultValue={1} variant="standard" />
          </Grid>
        </Grid>
      </DLBox>
      <DLBox mt={3}>
        <Grid item xs={12} lg={5} container>
          <DLButton variant="gradient" color="info" fullWidth>
            add to cart
          </DLButton>
        </Grid>
      </DLBox>
    </DLBox>
  );
}

export default ProductInfo;
