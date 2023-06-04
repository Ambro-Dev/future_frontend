/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import { Avatar } from "@mui/material";

function CategoriesList({ title, categories }) {
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const renderItems = categories.map(({ color, image, name, description, route }, key) => (
    <DLBox
      key={name}
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderRadius="lg"
      py={1}
      pr={2}
      mb={categories.length - 1 === key ? 0 : 1}
    >
      <DLBox display="flex" alignItems="center">
        <DLBox
          display="grid"
          alignItems="center"
          justifyContent="center"
          bgColor={color}
          borderRadius="lg"
          shadow="md"
          color="white"
          width="2rem"
          height="2rem"
          mr={2}
          variant="gradient"
          fontSize="0.875rem"
        >
          <Avatar src={`${serverUrl}/${image}`} variant="rounded" alt={name} />
        </DLBox>
        <DLBox display="flex" flexDirection="column">
          <DLTypography variant="button" color={color} fontWeight="medium" gutterBottom>
            {name}
          </DLTypography>
          <DLTypography variant="caption" color="text">
            {description}
          </DLTypography>
        </DLBox>
      </DLBox>
      <DLBox display="flex">
        <DLTypography
          component={Link}
          variant="button"
          color={color}
          to={route}
          sx={{
            lineHeight: 0,
            transition: "all 0.2s cubic-bezier(.34,1.61,.7,1.3)",
            p: 0.5,

            "&:hover, &:focus": {
              transform: "translateX(5px)",
            },
          }}
        >
          <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
        </DLTypography>
      </DLBox>
    </DLBox>
  ));

  return (
    <Card>
      <DLBox pt={2} px={2}>
        <DLTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </DLTypography>
      </DLBox>
      <DLBox p={2}>
        <DLBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </DLBox>
      </DLBox>
    </Card>
  );
}

// Typechecking props for the CategoriesList
CategoriesList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
