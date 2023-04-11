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
import { useTranslation } from "react-i18next";

function GradesList({ title, userResults, index }) {
  const { t } = useTranslation("translation", { keyPrefix: "grades" });
  const renderItems = Object.entries(userResults).map(([courseName, exams]) => (
    <MDBox
      key={`${courseName}`}
      component="li"
      display="flex"
      flexDirection="column"
      borderRadius="lg"
      py={1}
      pr={2}
      mb={2}
    >
      <MDAccordion key={`${courseName}`} sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index}-content`}>
          <MDBox ml={2} mt={0.5} lineHeight={1.4}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              {courseName}
            </MDTypography>
          </MDBox>
        </AccordionSummary>
        <AccordionDetails>
          {exams.map(({ examTitle, results }) => (
            <Card sx={{ marginTop: 1 }}>
              {results &&
                results.map(({ userId, json }) => (
                  <MDBox p={1} key={`${courseName}-${examTitle}-${userId}`} display="flex">
                    <MDBox ml={2} mt={2} lineHeight={1.4}>
                      <MDTypography display="block" variant="button" fontWeight="medium">
                        {examTitle}
                      </MDTypography>
                    </MDBox>
                    <MDBox p={1}>
                      <MDBox width="100%" overflow="auto">
                        <MDTypography variant="button" fontWeight="regular">
                          {t("score")} {json.totalScore} / {json.maxScore}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                ))}
            </Card>
          ))}
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
};

export default GradesList;
