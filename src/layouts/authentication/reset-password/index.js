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
import { useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post("/reset-password", { email });
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  };
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
          <DLTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </DLTypography>
          <DLTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </DLTypography>
        </DLBox>
        <DLBox pt={4} pb={3} px={3}>
          <DLBox component="form" role="form" onSubmit={handleSubmit}>
            <DLBox mb={4}>
              <DLInput
                type="email"
                label="Enter your email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </DLBox>
            <DLBox mt={6} mb={1}>
              <DLButton variant="gradient" type="submit" color="info" fullWidth>
                reset
              </DLButton>
            </DLBox>
          </DLBox>
        </DLBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPassword;
