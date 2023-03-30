import React from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey.i18n";
import "survey-creator-core/survey-creator-core.i18n";
import { localization } from "survey-creator-core";
import surveyJSON from "../form_json";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";

function FormCreatorRenderComponent() {
  const translations = localization.getLocale("pl");
  translations.ed.toolboxGeneralCategory = "Inne";
  translations.ed.addNewQuestion = "Nowe pytanie";
  translations.ed.addNewTypeQuestion = "Nowe {0}";
  localization.currentLocale = "pl";
  const options = {
    showLogicTab: true,
    isAutoSave: true,
    haveCommercialLicense: true,
  };
  const creator = new SurveyCreator(options);
  creator.JSON = surveyJSON;
  creator.toolbox.changeCategories([
    {
      name: "image",
      category: "Read-only",
    },
    {
      name: "html",
      category: "Read-only",
    },
    {
      name: "expression",
      category: "Read-only",
    },
    {
      name: "dropdown",
      category: "Choice-based",
    },
    {
      name: "checkbox",
      category: "Choice-based",
    },
    {
      name: "radiogroup",
      category: "Choice-based",
    },
    {
      name: "imagepicker",
      category: "Choice-based",
    },
    {
      name: "paneldynamic",
      category: "Panels",
    },
    {
      name: "panel",
      category: "Panels",
    },
    {
      name: "paneldynamic",
      category: "Panels",
    },
    {
      name: "multipletext",
      category: "Text Input",
    },
    {
      name: "text",
      category: "Text Input",
    },
    {
      name: "comment",
      category: "Text Input",
    },
    {
      name: "matrix",
      category: "Matrixes",
    },
    {
      name: "matrixdropdown",
      category: "Matrixes",
    },
    {
      name: "matrixdynamic",
      category: "Matrixes",
    },
  ]);
  // Move the Others category to the end
  const { categories } = creator.toolbox;
  const othersIndex = categories.findIndex((category) => category.name === "Others");
  const othersCategory = categories.splice(othersIndex, 1)[0];
  categories.push(othersCategory);

  creator.toolbox.allowExpandMultipleCategories = true;
  creator.showSidebar = false;
  creator.toolbox.forceCompact = false;
  return <SurveyCreatorComponent creator={creator} />;
}

export default FormCreatorRenderComponent;
