/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLButton from "components/DLButton";

function SimpleBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <DLBox position="relative" borderRadius="lg" mt={-3} mx={2}>
        <DLBox
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="relative"
          zIndex={1}
        />
        <DLBox
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top="3%"
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </DLBox>
      <DLBox p={3}>
        <DLTypography display="inline" variant="h3" textTransform="capitalize" fontWeight="bold">
          {title}
        </DLTypography>
        <DLBox mt={2} mb={3}>
          <DLTypography variant="body2" component="p" color="text">
            {description}
          </DLTypography>
        </DLBox>
        {action.type === "external" ? (
          <MuiLink href={action.route} target="_blank" rel="noreferrer">
            <DLButton color={action.color ? action.color : "dark"}>{action.label}</DLButton>
          </MuiLink>
        ) : (
          <Link to={action.route}>
            <DLButton color={action.color ? action.color : "dark"}>{action.label}</DLButton>
          </Link>
        )}
      </DLBox>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
