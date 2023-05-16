/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Checkbox, Divider, Grid } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import ChangePassword from "./ChangePasword";

function EditUser() {
  const [manage, setManage] = useState(false);
  const [selectedUserRowIds, setSelectedUserRowIds] = useState([]);
  const [selectedCoursesRowIds, setSelectedCoursesRowIds] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState({});
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [addCourse, setAddCourse] = useState(false);
  const [chngPassword, setChngPassword] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user) {
      axiosPrivate
        .get(`users/${user.id}`)
        .then((response) => {
          setName(response.data.name);
          setSurname(response.data.surname);
          setStudentNumber(response.data.studentNumber);
          setEmail(response.data.email);
          setRoles(response.data.roles);
        })
        .catch((error) => {
          console.error(error);
        });

      axiosPrivate
        .get(`admin/${user.id}/courses`)
        .then((response) => {
          const newRows = response.data.map((row) => ({ ...row, isSelected: false }));
          setAllCourses(newRows);
        })
        .catch((error) => {
          console.error(error);
        });

      if (Object.values(user.roles).includes(5150)) {
        axiosPrivate
          .get(`users/teacher/${user.id}/courses`)
          .then((response) => {
            const newRows = response.data.map((row) => ({ ...row, isSelected: false }));
            setCourses(newRows);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axiosPrivate
          .get(`users/${user.id}/courses`)
          .then((response) => {
            const newRows = response.data.map((row) => ({ ...row, isSelected: false }));
            setCourses(newRows);
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, []);

  const handleUserRowSelect = (rowId, isSelected, e) => {
    e.preventDefault();
    if (isSelected) {
      // add row ID to selectedRowIds if it's not already in the array
      if (!selectedUserRowIds.includes(rowId)) {
        setSelectedUserRowIds([...selectedUserRowIds, rowId]);
      }
      // set isSelected property of selected row to true
      const newRows = courses.map((row) => {
        if (row._id === rowId) {
          return { ...row, isSelected: true };
        }
        return row;
      });
      setCourses(newRows);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedUserRowIds(selectedUserRowIds.filter((id) => id !== rowId));
      // set isSelected property of deselected row to false
      const newRows = courses.map((row) => {
        if (row._id === rowId) {
          return { ...row, isSelected: false };
        }
        return row;
      });
      setCourses(newRows);
    }
  };

  const handleCoursesRowSelect = (rowId, isSelected, e) => {
    e.preventDefault();
    if (isSelected) {
      // add row ID to selectedRowIds if it's not already in the array
      if (!selectedCoursesRowIds.includes(rowId)) {
        setSelectedCoursesRowIds([...selectedCoursesRowIds, rowId]);
      }
      // set isSelected property of selected row to true
      const newRows = allCourses.map((row) => {
        if (row._id === rowId) {
          return { ...row, isSelected: true };
        }
        return row;
      });
      setAllCourses(newRows);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedCoursesRowIds(selectedCoursesRowIds.filter((id) => id !== rowId));
      // set isSelected property of deselected row to false
      const newRows = allCourses.map((row) => {
        if (row._id === rowId) {
          return { ...row, isSelected: false };
        }
        return row;
      });
      setAllCourses(newRows);
    }
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={12} ml={1} mr={1}>
        <Card sx={{ marginTop: 3 }}>
          <MDBox
            variant="gradient"
            bgColor="secondary"
            borderRadius="lg"
            coloredShadow="success"
            mx={2}
            mt={-3}
            p={3}
            mb={1}
            my={3}
            textAlign="center"
          >
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Edit User
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            {user ? (
              <MDBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={chngPassword ? 4 : 10}>
                    {edit ? (
                      <>
                        <MDBox mb={2} display="flex">
                          <MDInput
                            type="text"
                            label="Name"
                            variant="standard"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2} display="flex">
                          <MDInput
                            type="text"
                            label="Surname"
                            multiline
                            variant="standard"
                            value={surname}
                            required
                            onChange={(e) => setSurname(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2} display="flex">
                          <MDInput
                            type="text"
                            label="Email"
                            variant="standard"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        {studentNumber && (
                          <MDBox mb={2} display="flex">
                            <MDInput
                              type="text"
                              label="Student Number"
                              variant="standard"
                              required
                              value={studentNumber}
                              onChange={(e) => setStudentNumber(e.target.value)}
                              fullWidth
                            />
                          </MDBox>
                        )}
                      </>
                    ) : (
                      <>
                        <MDBox mb={2} display="flex">
                          <MDButton
                            variant="gradient"
                            color="info"
                            onClick={() => setChngPassword(true)}
                          >
                            Change password
                          </MDButton>
                        </MDBox>
                        {name && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Name
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {name}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                        {surname && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Surname
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {surname}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                        {email && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Email
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {email}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                        {studentNumber && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Student Number
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {studentNumber}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                        {roles && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Role
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {Object.values(roles).includes(5150) && "Teacher"}
                                {Object.values(roles).includes(1984) && "Student"}
                                {Object.values(roles).includes(1001) && "Admin"}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                      </>
                    )}
                  </Grid>
                  {chngPassword && (
                    <Grid item xs={12} lg={6}>
                      <ChangePassword
                        setChngPassword={setChngPassword}
                        chngPassword={chngPassword}
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    xs={12}
                    lg={2}
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <MDBox mt={4} mb={1} textAlign="center">
                      {!edit && (
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Go back
                        </MDButton>
                      )}
                    </MDBox>
                    <MDButton
                      sx={{ margin: 2 }}
                      variant="contained"
                      color="warning"
                      onClick={() => {
                        setEdit(!edit);
                        setChngPassword(false);
                      }}
                    >
                      {!edit ? "Edit" : "Cancel"}
                    </MDButton>
                    {edit && (
                      <MDButton sx={{ margin: 2 }} variant="contained" color="error">
                        Delete
                      </MDButton>
                    )}
                  </Grid>
                </Grid>
                <Divider />
                <MDBox mt={5}>
                  {Object.values(user.roles).includes(5150) ? (
                    <MDTypography
                      component="label"
                      variant="h4"
                      fontWeight="medium"
                      color="success"
                    >
                      Owner:
                    </MDTypography>
                  ) : (
                    <MDBox>
                      <MDBox
                        variant="gradient"
                        bgColor="success"
                        borderRadius="lg"
                        coloredShadow="success"
                        mt={-3}
                        p={1}
                        my={3}
                        textAlign="center"
                      >
                        <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
                          User courses
                        </MDTypography>
                      </MDBox>
                      <MDBox sx={{ display: "flex" }}>
                        <MDButton
                          color={manage ? "warning" : "success"}
                          onClick={() => {
                            setManage(!manage);
                            setChngPassword(false);
                          }}
                          sx={{ margin: 1 }}
                          variant="outlined"
                        >
                          {manage ? "Cancel" : "Manage courses"}
                        </MDButton>
                        {manage && (
                          <>
                            {!addCourse && (
                              <MDButton
                                sx={{ margin: 1 }}
                                color="error"
                                disabled={!selectedUserRowIds.length}
                                onClick={() => console.log(selectedUserRowIds, courses)}
                              >
                                Remove selected courses
                              </MDButton>
                            )}

                            <MDButton
                              color="info"
                              onClick={() => setAddCourse(true)}
                              sx={{ margin: 1 }}
                            >
                              Add user to courses
                            </MDButton>
                          </>
                        )}
                      </MDBox>
                    </MDBox>
                  )}

                  {manage ? (
                    <MDBox>
                      {!addCourse && (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: "",
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <Checkbox
                                    checked={row.original.isSelected}
                                    onChange={(e) =>
                                      handleUserRowSelect(row.original._id, e.target.checked, e)
                                    }
                                  />
                                ),
                                isCheckbox: true,
                                width: 10,
                              },
                              { Header: "name", accessor: "name" },
                              {
                                Header: "teacher",
                                accessor: "teacherId",
                                Cell: ({ row }) => (
                                  <MDBox>
                                    {row.original.teacherId.name} {row.original.teacherId.surname}
                                  </MDBox>
                                ),
                              },
                            ],
                            rows: courses,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      )}

                      {addCourse && (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: "",
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <Checkbox
                                    checked={row.original.isSelected}
                                    onChange={(e) =>
                                      handleCoursesRowSelect(row.original._id, e.target.checked, e)
                                    }
                                  />
                                ),
                                isCheckbox: true,
                                width: 10,
                              },
                              { Header: "name", accessor: "name" },
                              {
                                Header: "teacher",
                                accessor: "teacherId",
                                Cell: ({ row }) => (
                                  <MDBox>
                                    {row.original.teacherId.name} {row.original.teacherId.surname}
                                  </MDBox>
                                ),
                              },
                              {
                                Header: "members",
                                accessor: "members",
                                Cell: ({ row }) => <MDBox>{row.original.members.length}</MDBox>,
                              },
                            ],
                            rows: allCourses,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      )}
                    </MDBox>
                  ) : (
                    <DataTable
                      table={{
                        columns: [
                          { Header: "name", accessor: "name" },
                          {
                            Header: "teacher",
                            accessor: "teacherId",
                            Cell: ({ row }) => (
                              <MDBox>
                                {row.original.teacherId.name} {row.original.teacherId.surname}
                              </MDBox>
                            ),
                          },
                        ],
                        rows: courses,
                      }}
                      entriesPerPage={false}
                      canSearch
                    />
                  )}
                </MDBox>
              </MDBox>
            ) : (
              <MDBox>No course selected</MDBox>
            )}
          </MDBox>
        </Card>
      </MDBox>
    </PageLayout>
  );
}

export default EditUser;
