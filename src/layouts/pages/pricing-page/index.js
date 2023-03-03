// Material Dashboard 2 PRO React examples
import { Container } from "@mui/material";
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Pricing page components
import Footer from "layouts/pages/pricing-page/components/Footer";

function PricingPage() {
  return (
    <PageLayout>
      <Container>
        <MDBox> </MDBox>
      </Container>
      <Footer />
    </PageLayout>
  );
}

export default PricingPage;
