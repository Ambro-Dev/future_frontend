/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";

// Distance Learning React examples
import DataTable from "examples/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useEffect, useState } from "react";

function Users() {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosPrivate
      .get("/users")
      .then((response) => {
        setUsers(response.data);
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
          {users.length > 0 && (
            <MDBox>
              <Card>
                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name" },
                      { Header: "surname", accessor: "surname" },
                      {
                        Header: "Role",
                        accessor: "roles",
                        Cell: ({ value }) =>
                          value.Student ? "Student" : value.Teacher ? "Teacher" : "-",
                      },
                    ],
                    rows: users,
                  }}
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

export default Users;
