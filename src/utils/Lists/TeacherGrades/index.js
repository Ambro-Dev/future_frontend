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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import { ExpandMore } from "@mui/icons-material";
import DLAccordion from "components/DLAccordion";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import { useTranslation } from "react-i18next";

function TeacherGrades({ title, userResults }) {
  const { t } = useTranslation("translation", { keyPrefix: "grades" });
  const renderItems = userResults.map(({ courseName, examId, examTitle, results, index }) => (
    <DLBox
      key={`${examId}-${courseName}-${index}`}
      component="li"
      display="flex"
      flexDirection="column"
      py={1}
      pr={2}
      mb={2}
      sx={{
        borderRadius: 3,
        background: "#f0f0f0",
        boxShadow: "-2px 2px 10px #cccccc, 2px -2px 10px #ffffff",
      }}
    >
      <DLAccordion key={examId} sx={{ width: "100%" }}>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${examId}-content`}>
          <DLBox ml={2} mt={0.5} lineHeight={1.4}>
            <DLTypography display="block" variant="button" fontWeight="medium">
              {courseName} - {examTitle}
            </DLTypography>
          </DLBox>
        </AccordionSummary>
        <AccordionDetails>
          <DLBox sx={{ overflow: "auto", maxHeight: 300, padding: 1 }}>
            {results.map(({ userId, userName, userSurname, totalScore, maxScore, i }) => (
              <Card sx={{ marginTop: 1 }}>
                <DLBox p={1} key={`${examId}-${userId}-${i}`} display="flex">
                  <DLBox ml={2} mt={2} lineHeight={1.4}>
                    <DLTypography display="block" variant="button" fontWeight="medium">
                      {userName} {userSurname}
                    </DLTypography>
                  </DLBox>
                  <DLBox p={1}>
                    <DLBox width="100%">
                      <DLTypography variant="button" fontWeight="regular">
                        {t("score")} {totalScore} / {maxScore}
                      </DLTypography>
                    </DLBox>
                  </DLBox>
                </DLBox>
              </Card>
            ))}
          </DLBox>
        </AccordionDetails>
      </DLAccordion>
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
TeacherGrades.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TeacherGrades;
