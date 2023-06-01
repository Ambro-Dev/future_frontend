/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
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

function Users({ setVisible, visible, loading }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();

  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    axiosPrivate
      .get("admin/users")
      .then((response) => {
        const newRows = response.data.map((row) => {
          if (Object.values(row.roles).includes(5150)) {
            return { ...row, role: "Teacher" };
          }
          if (Object.values(row.roles).includes(1001)) {
            return { ...row, role: "Admin" };
          }
          return { ...row, role: "Student" };
        });
        setUsers(newRows);
        setDataLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDataLoading(false);
      });
  }, [loading]);

  const openEdit = (row) => {
    const user = {
      id: row.original._id,
      roles: row.original.roles,
    };

    navigate("/admin/users/edit-user", { state: user });
  };

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
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-students")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <MDTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import students (CSV)
              </MDTypography>
            </MDButton>
            <MDButton
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-teachers")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <MDTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import teachers (CSV)
              </MDTypography>
            </MDButton>
          </MDBox>
          <Divider />
          {!dataLoading ? (
            <MDBox>
              {users?.length > 0 && (
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
                        { Header: "Role", accessor: "role" },
                        {
                          Header: "action",
                          accessor: "actions",
                          width: "15%",
                          Cell: ({ row }) => (
                            <MDButton onClick={() => openEdit(row)}>Edit</MDButton>
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
      </MDBox>
    </Card>
  );
}

export default Users;
