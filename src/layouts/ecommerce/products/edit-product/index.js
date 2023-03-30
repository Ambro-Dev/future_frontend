import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";
import FormCreatorRenderComponent from "./components/FormCreatorComponent";

function ExamBuilder() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <FormCreatorRenderComponent />;
    </DashboardLayout>
  );
}

export default ExamBuilder;
