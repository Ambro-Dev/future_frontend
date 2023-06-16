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

// Distance Learning React utils
import PageLayout from "utils/LayoutContainers/PageLayout";

// Distance Learning React page layout routes

// Authentication pages components
import Footer from "layouts/authentication/components/Footer";

function BasicLayout({ image, children }) {
  return (
    <PageLayout>
      <DLBox
        position="absolute"
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <DLBox px={1} width="100%" maxWidth="1000px" height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={10} md={9} lg={8} xl={7}>
            {children}
          </Grid>
        </Grid>
        <Footer light />
      </DLBox>
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
BasicLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BasicLayout;
