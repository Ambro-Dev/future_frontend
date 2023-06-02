// Distance Learning React examples
import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { DropzoneDialog } from "mui-file-dropzone";
import pageRoutes from "page.routes";
import { useState } from "react";

function ImportStudents() {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);

  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);

  const handleDownloadSchema = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.get("/admin/student-schema", {
        responseType: "blob",
      });
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

  const handleSave = async (files) => {
    setOpen(false);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axiosPrivate
      .post("/admin/import-students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setResults(response.data.results);
        setErrors(response.data.errors);
        alert("Students imported successfully");
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={12} ml={1} mr={1}>
        <Card sx={{ marginTop: 3 }}>
          <MDBox
            variant="gradient"
            bgColor="secondary"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            my={3}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Import students
            </MDTypography>
          </MDBox>
          <MDBox pl={2}>
            <MDButton
              color="primary"
              variant="outlined"
              sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
              onClick={handleDownloadSchema}
            >
              Download CSV schema
            </MDButton>
            <MDButton onClick={handleOpen}>Upload CSV file</MDButton>
            <DropzoneDialog
              open={open}
              onSave={handleSave}
              acceptedFiles={["text/csv"]}
              showPreviews
              maxFileSize={10000000}
              onClose={handleClose}
            />
          </MDBox>
          {(results.length > 0 || errors.length > 0) && (
            <MDBox m={1}>
              <Grid container spacing={1}>
                <Grid item lg={6} sx={12}>
                  <MDBox
                    variant="gradient"
                    bgColor="success"
                    borderRadius="lg"
                    coloredShadow="success"
                    mt={-3}
                    p={1}
                    mb={1}
                    my={3}
                    textAlign="center"
                  >
                    <MDTypography variant="h6" fontWeight="medium" color="white">
                      Imported
                    </MDTypography>
                  </MDBox>
                  <DataTable
                    table={{
                      columns: [{ Header: "studentNumber", accessor: "studentNumber" }],
                      rows: results,
                    }}
                    entriesPerPage={false}
                  />
                </Grid>
                <Grid item lg={6} sx={12}>
                  <MDBox
                    variant="gradient"
                    bgColor="error"
                    borderRadius="lg"
                    coloredShadow="success"
                    mt={-3}
                    p={1}
                    mb={1}
                    my={3}
                    textAlign="center"
                  >
                    <MDTypography variant="h6" fontWeight="medium" color="white">
                      Errors
                    </MDTypography>
                  </MDBox>
                  <DataTable
                    table={{
                      columns: [
                        { Header: "line", accessor: "line" },
                        { Header: "error", accessor: "error" },
                      ],
                      rows: errors,
                    }}
                    entriesPerPage={false}
                  />
                </Grid>
              </Grid>
            </MDBox>
          )}
        </Card>
      </MDBox>
    </PageLayout>
  );
}

export default ImportStudents;
