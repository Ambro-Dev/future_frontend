/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import { CircularProgress, Divider } from "@mui/material";
import Card from "@mui/material/Card";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLButton from "components/DLButton";
import DLTypography from "components/DLTypography";

// Distance Learning React utils
import DataTable from "utils/Tables/DataTable";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ErrorContext from "context/ErrorProvider";

function Users({ setVisible, visible, loading }) {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const { showErrorNotification } = useContext(ErrorContext);

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
        showErrorNotification("Error", err.message);
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
      <DLBox>
        <DLBox>
          <DLBox pt={2} px={2} lineHeight={1}>
            <DLTypography variant="h6" fontWeight="medium" pb={1}>
              Users
            </DLTypography>
          </DLBox>
          <DLBox pl={2}>
            <DLButton color="primary" sx={{ margin: 1 }} onClick={() => setVisible(!visible)}>
              Add User
            </DLButton>
            <DLButton
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-students")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <DLTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import students (CSV)
              </DLTypography>
            </DLButton>
            <DLButton
              color="info"
              sx={{ margin: 1 }}
              onClick={() => navigate("/admin/import-teachers")}
              endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
            >
              <DLTypography variant="button" sx={{ color: "#FFFFFF" }} fontWeight="medium">
                Import teachers (CSV)
              </DLTypography>
            </DLButton>
          </DLBox>
          <Divider />
          {!dataLoading ? (
            <DLBox>
              {users?.length > 0 && (
                <DLBox>
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
                            <DLButton onClick={() => openEdit(row)}>Edit</DLButton>
                          ),
                        },
                      ],
                      rows: users,
                    }}
                    canSearch
                  />
                </DLBox>
              )}
            </DLBox>
          ) : (
            <DLBox
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </DLBox>
          )}
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default Users;
