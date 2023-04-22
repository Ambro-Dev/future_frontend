/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { DropzoneDialog } from "mui-file-dropzone";
import { useState } from "react";
import pageRoutes from "page.routes";

function ImportUsers() {
  const axiosPrivate = useAxiosPrivate();
  const [openStudent, setOpenStudent] = useState(false);
  const [openTeacher, setOpenTeacher] = useState(false);
  const [savedUsers, setSavedUsers] = useState([]);

  console.log(savedUsers);

  const handleDownloadStudentSchema = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.get("/admin/student-schema", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "student-schema.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleDownloadTeacherSchema = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.get("/admin/teacher-schema", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "teacher-schema.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleStudentSave = async (files) => {
    setOpenStudent(false);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axiosPrivate
      .post("/admin/import-students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSavedUsers(response.data);
        console.log(response.data);
        alert("Users imported successfully");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleTeacherSave = async (files) => {
    setOpenStudent(false);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axiosPrivate
      .post("/admin/import-teachers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSavedUsers(response.data);
        console.log(response.data);
        alert("Users imported successfully");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleOpenStudent = () => {
    setOpenStudent(true);
  };

  const handleCloseStudent = () => {
    setOpenStudent(false);
  };

  const handleOpenTeacher = () => {
    setOpenTeacher(true);
  };

  const handleCloseTeacher = () => {
    setOpenTeacher(false);
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={10} ml={1} mr={1} pt={1}>
        <Card>
          <MDBox>
            <MDBox>
              <MDButton
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
                onClick={handleDownloadStudentSchema}
              >
                Import students (CSV)
              </MDButton>
              <MDButton onClick={handleOpenStudent}>import Students</MDButton>
              <DropzoneDialog
                open={openStudent}
                onSave={handleStudentSave}
                acceptedFiles={["text/csv"]}
                showPreviews
                maxFileSize={10000000}
                onClose={handleCloseStudent}
              />
              <MDButton
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
                onClick={handleDownloadTeacherSchema}
              >
                Import teachers (CSV)
              </MDButton>
              <MDButton onClick={handleOpenTeacher}>import Teacher</MDButton>
              <DropzoneDialog
                open={openTeacher}
                onSave={handleTeacherSave}
                acceptedFiles={["text/csv"]}
                showPreviews
                maxFileSize={10000000}
                onClose={handleCloseTeacher}
              />
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </PageLayout>
  );
}

export default ImportUsers;
