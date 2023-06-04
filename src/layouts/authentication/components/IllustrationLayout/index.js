/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React utils
import DefaultNavbar from "utils/Navbars/DefaultNavbar";
import PageLayout from "utils/LayoutContainers/PageLayout";

// Distance Learning React page layout routes
import pageRoutes from "page.routes";

// Distance Learning React context
import { useMaterialUIController } from "context";

function IllustrationLayout({ header, title, description, illustration, children }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <PageLayout background="white">
      <DefaultNavbar
        routes={pageRoutes}
        action={{
          type: "external",
          route: "https://creative-tim.com/product/material-dashboard-pro-react",
          label: "buy now",
        }}
      />
      <Grid
        container
        sx={{
          backgroundColor: ({ palette: { background, white } }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={12} lg={6}>
          <DLBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${illustration})` }}
          />
        </Grid>
        <Grid item xs={11} sm={8} md={6} lg={4} xl={3} sx={{ mx: "auto" }}>
          <DLBox display="flex" flexDirection="column" justifyContent="center" height="100vh">
            <DLBox py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <DLBox mb={1} textAlign="center">
                    <DLTypography variant="h4" fontWeight="bold">
                      {title}
                    </DLTypography>
                  </DLBox>
                  <DLTypography variant="body2" color="text">
                    {description}
                  </DLTypography>
                </>
              ) : (
                header
              )}
            </DLBox>
            <DLBox p={3}>{children}</DLBox>
          </DLBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Setting default values for the props of IllustrationLayout
IllustrationLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  illustration: "",
};

// Typechecking props for the IllustrationLayout
IllustrationLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  illustration: PropTypes.string,
};

export default IllustrationLayout;
