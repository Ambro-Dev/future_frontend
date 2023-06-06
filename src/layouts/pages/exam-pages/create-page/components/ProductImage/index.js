/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

// Images
import productImage from "assets/images/products/product-11.jpg";

function ProductImage() {
  return (
    <Card
      sx={{
        "&:hover .card-header": {
          transform: "translate3d(0, -50px, 0)",
        },
      }}
    >
      <DLBox
        position="relative"
        borderRadius="lg"
        mt={-3}
        mx={2}
        className="card-header"
        sx={{ transition: "transform 300ms cubic-bezier(0.34, 1.61, 0.7, 1)" }}
      >
        <DLBox
          component="img"
          src={productImage}
          alt="Product Image"
          borderRadius="lg"
          shadow="sm"
          width="100%"
          height="100%"
          position="relative"
          zIndex={10}
          mb={2}
        />
      </DLBox>
      <DLBox textAlign="center" pt={2} pb={3} px={3}>
        <DLBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={-10}
          position="relative"
          zIndex={1}
        >
          <DLBox mr={1}>
            <DLButton variant="gradient" color="info" size="small">
              edit
            </DLButton>
          </DLBox>
          <DLButton variant="outlined" color="dark" size="small">
            remove
          </DLButton>
        </DLBox>
        <DLTypography variant="h5" fontWeight="regular" sx={{ mt: 4 }}>
          Product Image
        </DLTypography>
        <DLTypography variant="body2" color="text" sx={{ mt: 1.5, mb: 1 }}>
          The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to
          &#8220;Naviglio&#8221; where you can enjoy the main night life in Barcelona.
        </DLTypography>
      </DLBox>
    </Card>
  );
}

export default ProductImage;
