/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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

function Users({ setVisible, visible }) {
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
                <MDBox pt={2} px={2} lineHeight={1}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Users
                  </MDTypography>
                </MDBox>
                <MDBox>
                  <MDButton color="primary" onClick={() => setVisible(!visible)}>
                    Add User
                  </MDButton>
                  <MDButton color="primary" variant="text">
                    Import students (CSV)
                  </MDButton>
                  <MDButton color="primary" variant="outlined">
                    Import teachers (CSV)
                  </MDButton>
                </MDBox>
                <Divider />

                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name" },
                      { Header: "surname", accessor: "surname" },
                      {
                        Header: "Student Number",
                        accessor: "studentNumber",
                        Cell: ({ value }) => value || "-",
                      },
                      {
                        Header: "Role",
                        accessor: "roles",
                        Cell: ({ value }) =>
                          value.Student ? "Student" : value.Teacher ? "Teacher" : "-",
                      },
                      {
                        Header: "action",
                        accessor: "actions",
                        width: "15%",
                        Cell: ({ row }) => (
                          <MDButton onClick={() => console.log(row.original)}>Edit</MDButton>
                        ),
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
