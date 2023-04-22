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
import { useNavigate } from "react-router-dom";

function Users({ setVisible, visible, loading }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    axiosPrivate
      .get("admin/users")
      .then((response) => {
        setUsers(response.data);
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
          <MDBox>
            <MDBox pt={2} px={2} lineHeight={1}>
              <MDTypography variant="h6" fontWeight="medium" pb={1}>
                Users
              </MDTypography>
            </MDBox>
            <MDBox pl={2}>
              <MDButton
                color="primary"
                onClick={() => setVisible(!visible)}
                sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
              >
                Add User
              </MDButton>
              <MDButton
                color="primary"
                variant="outlined"
                onClick={() => navigate("/admin/users/import")}
                sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
              >
                Import Users
              </MDButton>
            </MDBox>
            <Divider />
            {users.length > 0 && (
              <MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name" },
                      { Header: "surname", accessor: "surname" },
                      { Header: "email", accessor: "email" },
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
              </MDBox>
            )}
          </MDBox>
        </MDBox>
      </Card>
    );
  }

  return <MDBox>DataLoading</MDBox>;
}

export default Users;
