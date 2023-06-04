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
import DLInput from "components/DLInput";
import DLButton from "components/DLButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function Cover() {
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <DLBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <DLTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </DLTypography>
          <DLTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </DLTypography>
        </DLBox>
        <DLBox pt={4} pb={3} px={3}>
          <DLBox component="form" role="form">
            <DLBox mb={4}>
              <DLInput type="email" label="Email" variant="standard" fullWidth />
            </DLBox>
            <DLBox mt={6} mb={1}>
              <DLButton variant="gradient" color="info" fullWidth>
                reset
              </DLButton>
            </DLBox>
          </DLBox>
        </DLBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
