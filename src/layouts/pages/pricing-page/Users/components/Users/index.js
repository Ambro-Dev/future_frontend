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
import { DropzoneDialog } from "mui-file-dropzone";
import { useEffect, useState } from "react";

function Users({ setVisible, visible, loading }) {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
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

  const handleDownloadSchema = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosPrivate.get("/admin/student-schema", { responseType: "blob" });
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
      .then(() => {
        alert("Users imported successfully");
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
                sx={{ marginRight: 1, marginTop: 1, marginBottom: 1 }}
                onClick={handleDownloadSchema}
              >
                Import students (CSV)
              </MDButton>
              <MDButton onClick={handleOpen}>import Students</MDButton>
              <DropzoneDialog
                open={open}
                onSave={handleSave}
                acceptedFiles={["text/csv"]}
                showPreviews
                maxFileSize={10000000}
                onClose={handleClose}
              />
              <MDButton color="primary" variant="outlined">
                Import teachers (CSV)
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
