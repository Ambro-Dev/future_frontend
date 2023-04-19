/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function Courses({ setVisible, visible, loading }) {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState();
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

  if (!dataLoading) {
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
            >
              Import courses (CSV)
            </MDButton>
          </MDBox>
          <Divider />
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
                        Cell: ({ row }) => (
                          <MDButton onClick={() => console.log(row)}>Edit</MDButton>
                        ),
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
        </MDBox>
      </Card>
    );
  }

  return <MDBox>DataLoading</MDBox>;
}

export default Courses;
