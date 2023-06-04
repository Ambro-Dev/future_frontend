import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React base styles
import typography from "assets/theme/base/typography";

function Footer({ light }) {
  const { size } = typography;

  return (
    <DLBox position="relative" width="100%" bottom={0} py={4}>
      <Container>
        <DLBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <DLBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; 2022, made by Gwarant-Service
          </DLBox>
          <DLBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <DLBox component="li" pr={2} lineHeight={1}>
              <Link href="https://mans.org.pl/" target="_blank">
                <DLTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  MANS
                </DLTypography>
              </Link>
            </DLBox>
            <DLBox component="li" px={2} lineHeight={1}>
              <Link href="https://mans.org.pl/" target="_blank">
                <DLTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  About Us
                </DLTypography>
              </Link>
            </DLBox>
            <DLBox component="li" px={2} lineHeight={1}>
              <Link href="https://mans.org.pl/" target="_blank">
                <DLTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Blog
                </DLTypography>
              </Link>
            </DLBox>
            <DLBox component="li" pl={2} lineHeight={1}>
              <Link href="https://mans.org.pl/" target="_blank">
                <DLTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  License
                </DLTypography>
              </Link>
            </DLBox>
          </DLBox>
        </DLBox>
      </Container>
    </DLBox>
  );
}

// Setting default props for the Footer
Footer.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
Footer.propTypes = {
  light: PropTypes.bool,
};

export default Footer;
