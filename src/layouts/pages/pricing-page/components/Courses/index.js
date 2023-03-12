import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function Courses() {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosPrivate
      .get("/courses")
      .then((response) => {
        setCourses(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!loading) {
    return (
      <MDBox my={3}>
        <MDBox>
          {courses.length > 0 && (
            <MDBox>
              <Card>
                <DataTable
                  table={{
                    columns: [{ Header: "name", accessor: "name" }],
                    rows: courses,
                  }}
                  entriesPerPage={false}
                  canSearch
                />
              </Card>
            </MDBox>
          )}
        </MDBox>
      </MDBox>
    );
  }

  return <MDBox>Loading</MDBox>;
}

export default Courses;
