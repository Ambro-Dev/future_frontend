/* eslint-disable react/button-has-type */
import PageLayout from "utils/LayoutContainers/PageLayout";
import { useNavigate } from "react-router-dom";
import DLTypography from "./DLTypography";
import DLBox from "./DLBox";
import DLButton from "./DLButton";

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <PageLayout>
      <DLTypography variant="h1">Unauthorized</DLTypography>
      <DLTypography variant="text">You do not have access to the requested page.</DLTypography>
      <DLBox>
        <DLButton onClick={goBack}>Go Back</DLButton>
      </DLBox>
    </PageLayout>
  );
}

export default Unauthorized;
