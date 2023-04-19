/* eslint-disable react/button-has-type */
import PageLayout from "examples/LayoutContainers/PageLayout";
import { useNavigate } from "react-router-dom";
import MDTypography from "./MDTypography";
import MDBox from "./MDBox";
import MDButton from "./MDButton";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <PageLayout>
      <MDTypography variant="h1">Unauthorized</MDTypography>
      <MDTypography variant="text">You do not have access to the requested page.</MDTypography>
      <MDBox>
        <MDButton onClick={goBack}>Go Back</MDButton>
      </MDBox>
    </PageLayout>
  );
}

export default Unauthorized;
