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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

function Courses({ setVisible, visible, loading }) {
  const axiosPrivate = useAxiosPrivate();
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
            color="info"
            sx={{ margin: 1 }}
            onClick={() => navigate("/admin/import-courses")}
            endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
          >
            <MDTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
              Import courses (CSV)
            </MDTypography>
          </MDButton>
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
