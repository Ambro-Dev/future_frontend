/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <DLBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <DLTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </DLTypography>
        </Link>
      </DLBox>
    ));

  return (
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
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made by
        <Link href={href} target="_blank">
          <DLTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </DLTypography>
        </Link>
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
        {renderLinks()}
      </DLBox>
    </DLBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://ambro.dev/", name: "Ambro-Dev" },
  links: [
    { href: "https://ambro.dev/", name: "Dev page" },
    { href: "https://ambro.dev/", name: "About Us" },
    { href: "https://ambro.dev/", name: "Blog" },
    { href: "https://ambro.dev/", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
