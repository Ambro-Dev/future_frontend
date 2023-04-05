/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { ExpandMore } from "@mui/icons-material";
import MDAccordion from "components/MDAccordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";

function GradesList({ title, categories, index }) {
  const renderItems = categories.map(({ course, name, exam, totalScore, maxScore }, key) => (
    <MDBox
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
      <MDAccordion sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}-content`}>
          <MDBox ml={2} mt={0.5} lineHeight={1.4}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {course}
            </MDTypography>
          </MDBox>
        </AccordionSummary>
        <AccordionDetails>
          <MDBox>
            <Card>
              {/* Invoice header */}
              <MDBox p={1}>
                <MDBox p={1}>
                  <MDBox width="100%" overflow="auto">
                    <MDTypography variant="h6" color="text" fontWeight="regular">
                      {exam}
                    </MDTypography>
                    <MDTypography variant="button" fontWeight="regular">
                      Score: {totalScore} / {maxScore}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </MDBox>
        </AccordionDetails>
      </MDAccordion>
    </MDBox>
  ));

  return (
    <Card>
      <MDBox pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Typechecking props for the CategoriesList
GradesList.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default GradesList;
