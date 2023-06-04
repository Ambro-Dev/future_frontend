/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";
import DLButton from "components/DLButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <DLBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <DLTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </DLTypography>
          <DLTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </DLTypography>
        </DLBox>
        <DLBox pt={4} pb={3} px={3}>
          <DLBox component="form" role="form">
            <DLBox mb={2}>
              <DLInput type="text" label="Name" variant="standard" fullWidth />
            </DLBox>
            <DLBox mb={2}>
              <DLInput type="email" label="Email" variant="standard" fullWidth />
            </DLBox>
            <DLBox mb={2}>
              <DLInput type="password" label="Password" variant="standard" fullWidth />
            </DLBox>
            <DLBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <DLTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </DLTypography>
              <DLTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </DLTypography>
            </DLBox>
            <DLBox mt={4} mb={1}>
              <DLButton variant="gradient" color="info" fullWidth>
                sign in
              </DLButton>
            </DLBox>
            <DLBox mt={3} mb={1} textAlign="center">
              <DLTypography variant="button" color="text">
                Already have an account?{" "}
                <DLTypography
                  component={Link}
                  to="/authentication/sign-in/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </DLTypography>
              </DLTypography>
            </DLBox>
          </DLBox>
        </DLBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
