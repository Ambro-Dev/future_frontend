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

// Distance Learning React utils
import DashboardLayout from "utils/LayoutContainers/DashboardLayout";
import DashboardNavbar from "utils/Navbars/DashboardNavbar";
import Footer from "utils/Footer";
import DataTable from "utils/Tables/DataTable";

// ProductPage page components
import ProductImages from "layouts/ecommerce/products/product-page/components/ProductImages";
import ProductInfo from "layouts/ecommerce/products/product-page/components/ProductInfo";

// Data
import dataTableData from "layouts/ecommerce/products/product-page/data/dataTableData";

function ProductPage() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DLBox py={3}>
        <Card sx={{ overflow: "visible" }}>
          <DLBox p={3}>
            <DLBox mb={3}>
              <DLTypography variant="h5" fontWeight="medium">
                Product Details
              </DLTypography>
            </DLBox>

            <Grid container spacing={3}>
              <Grid item xs={12} lg={6} xl={5}>
                <ProductImages />
              </Grid>
              <Grid item xs={12} lg={5} sx={{ mx: "auto" }}>
                <ProductInfo />
              </Grid>
            </Grid>

            <DLBox mt={8} mb={2}>
              <DLBox mb={1} ml={2}>
                <DLTypography variant="h5" fontWeight="medium">
                  Other Products
                </DLTypography>
              </DLBox>
              <DataTable
                table={dataTableData}
                entriesPerPage={false}
                showTotalEntries={false}
                isSorted={false}
              />
            </DLBox>
          </DLBox>
        </Card>
      </DLBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ProductPage;
