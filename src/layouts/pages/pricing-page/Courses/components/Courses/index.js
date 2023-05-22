/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { CircularProgress, Divider } from "@mui/material";
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { DropzoneDialog } from "mui-file-dropzone";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses({ setVisible, visible, loading }) {
  const axiosPrivate = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState();
  const navigate = useNavigate();
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    axiosPrivate
      .get("/courses")
      .then((response) => {
        setCourses(response.data);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDataLoading(false);
      });
  }, [loading]);

  const handleDownloadSchema = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.get("/admin/courses-schema", { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "courses-schema.csv");
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
      .post("/admin/import-courses", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Courses imported successfully");
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

  const openEdit = (row) => {
    const course = {
      id: row.original._id,
      description: row.original.description,
      name: row.original.name,
      teacherId: row.original.teacherId,
    };

    navigate("/admin/courses/edit-course", { state: course });
    console.log(row.original);
  };

  return (
    <Card style={{ marginTop: 25 }}>
      <MDBox>
        <MDBox pt={2} px={2} lineHeight={1}>
          <MDTypography variant="h6" fontWeight="medium" pb={1}>
            Courses
          </MDTypography>
        </MDBox>
        <MDBox pl={2}>
          <MDButton
            color="primary"
            onClick={() => setVisible(!visible)}
            sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
          >
            Add Course
          </MDButton>
          <MDButton
            color="primary"
            variant="outlined"
            sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
            onClick={handleDownloadSchema}
          >
            Import courses (CSV)
          </MDButton>
          <MDButton onClick={handleOpen}>import Courses</MDButton>
          <DropzoneDialog
            open={open}
            onSave={handleSave}
            acceptedFiles={["text/csv"]}
            showPreviews
            maxFileSize={10000000}
            onClose={handleClose}
          />
        </MDBox>
        <Divider />
        {!dataLoading ? (
          <MDBox>
            {courses.length > 0 && (
              <MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name" },
                      {
                        Header: "action",
                        accessor: "actions",
                        width: "15%",
                        Cell: ({ row }) => <MDButton onClick={() => openEdit(row)}>Edit</MDButton>,
                      },
                    ],
                    rows: courses,
                  }}
                  entriesPerPage={false}
                  canSearch
                />
              </MDBox>
            )}
          </MDBox>
        ) : (
          <MDBox
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

export default Courses;
