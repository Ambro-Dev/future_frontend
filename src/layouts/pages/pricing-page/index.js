// Distance Learning React examples
import MDBox from "components/MDBox";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";

function PricingPage() {
  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={10} ml={1} mr={1}>
        Select menu
      </MDBox>
    </PageLayout>
  );
}

export default PricingPage;
