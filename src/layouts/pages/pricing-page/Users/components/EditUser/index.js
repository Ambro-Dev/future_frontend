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
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Chip, Dialog, DialogActions, Divider, Grid, Stack } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorContext from "context/ErrorProvider";
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
  const [reload, setReload] = useState(false);

  const { showErrorNotification, showInfoNotification } = useContext(ErrorContext);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (selectedUserRowIds.length === 0) setOpen(false);
  }, [selectedUserRowIds]);

  useEffect(() => {
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
          const newRows = response.data.map((row) => ({
            id: row._id,
            name: row.name,
            members: row.members,
            teacherId: row.teacherId,
          }));
          setAllCourses(newRows);
        })
        .catch((error) => {
          console.error(error);
        });

      if (Object.values(user.roles).includes(5150)) {
        axiosPrivate
          .get(`users/teacher/${user.id}/courses`)
          .then((response) => {
            const newRows = response.data.map((row) => ({
              id: row._id,
              name: row.name,
              members: row.members,
              teacherId: row.teacherId,
            }));
            setCourses(newRows);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        axiosPrivate
          .get(`users/${user.id}/courses`)
          .then((response) => {
            const newRows = response.data.map((row) => ({
              id: row._id,
              name: row.name,
              members: row.members,
              teacherId: row.teacherId,
            }));
            setCourses(newRows);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [reload]);

  const handleUserRowSelect = (rowId) => {
    if (!selectedUserRowIds.includes(rowId)) {
      // add row ID to selectedRowIds if it's not already in the array
      setSelectedUserRowIds([...selectedUserRowIds, rowId]);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedUserRowIds(selectedUserRowIds.filter((id) => id !== rowId));
    }
  };

  const handleCoursesRowSelect = (rowId) => {
    if (!selectedCoursesRowIds.includes(rowId)) {
      // add row ID to selectedRowIds if it's not already in the array
      setSelectedCoursesRowIds([...selectedCoursesRowIds, rowId]);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedCoursesRowIds(selectedCoursesRowIds.filter((id) => id !== rowId));
    }
  };

  const handleDelete = (course) => {
    setSelectedUserRowIds(selectedUserRowIds.filter((id) => id !== course));
  };

  const handleChipDelete = (course) => {
    setSelectedCoursesRowIds(selectedCoursesRowIds.filter((id) => id !== course));
  };

  const handleRemoveFromCourses = async () => {
    const rowsToRemove = selectedUserRowIds.map((row) => row.id);
    await axiosPrivate
      .put(`/admin/${user.id}/remove-courses`, { courses: rowsToRemove })
      .then((response) => {
        if (response.status === 500) showErrorNotification(response.data.message);
        else showInfoNotification(response.data.message);
      });
    setSelectedUserRowIds([]);
    setReload(!reload);
  };

  const handleAddToCourses = async () => {
    const rowsToAdd = selectedCoursesRowIds.map((row) => row.id);
    await axiosPrivate
      .put(`/admin/${user.id}/add-courses`, { courses: rowsToAdd })
      .then((response) => {
        if (response.status === 500) showErrorNotification(response.data.message);
        else showInfoNotification(response.data.message);
      });
    setSelectedCoursesRowIds([]);
    setReload(!reload);
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
                        userId={user.id}
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
                            if (!addCourse) setManage(!manage);
                            setChngPassword(false);
                            setAddCourse(false);
                          }}
                          sx={{ margin: 1 }}
                          variant="outlined"
                        >
                          {manage ? "Cancel" : "Manage courses"}
                        </MDButton>
                        {manage && (
                          <MDBox>
                            {!addCourse && (
                              <MDButton
                                sx={{ margin: 1 }}
                                color="error"
                                disabled={!selectedUserRowIds.length}
                                onClick={() => handleClickOpen()}
                              >
                                Remove selected courses
                              </MDButton>
                            )}

                            <Dialog open={open} onClose={handleClose}>
                              <MDBox key="dialog-card" sx={{ padding: 3 }}>
                                <MDBox
                                  variant="gradient"
                                  bgColor="info"
                                  borderRadius="lg"
                                  coloredShadow="info"
                                  mt={-3}
                                  p={1}
                                  my={-1}
                                  textAlign="center"
                                  key="title"
                                >
                                  <MDTypography
                                    key="title-text"
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                  >
                                    Confirm operation
                                  </MDTypography>
                                </MDBox>
                                <MDBox key="title-description" m={2}>
                                  <MDTypography key="title-description-text" variant="button">
                                    Remove user from courses:
                                  </MDTypography>
                                </MDBox>
                                <MDBox key="content">
                                  <Stack direction="column" spacing={1} key="dialog-stack">
                                    {selectedUserRowIds.flatMap((course, index) => (
                                      <Chip
                                        key={`${course._id}-${index}`}
                                        label={course.name}
                                        variant="outlined"
                                        onDelete={() => handleDelete(course)}
                                      />
                                    ))}
                                  </Stack>
                                </MDBox>

                                <DialogActions>
                                  <MDButton
                                    onClick={handleClose}
                                    variant="outlined"
                                    color="warning"
                                  >
                                    Cancel
                                  </MDButton>
                                  <MDButton
                                    variant="outlined"
                                    color="success"
                                    onClick={handleRemoveFromCourses}
                                    autoFocus
                                  >
                                    Accept
                                  </MDButton>
                                </DialogActions>
                              </MDBox>
                            </Dialog>

                            <MDButton
                              color="info"
                              onClick={() => {
                                if (selectedCoursesRowIds.length > 0) handleAddToCourses();
                                else setAddCourse(true);
                              }}
                              sx={{ margin: 1 }}
                            >
                              {addCourse ? "Add user to selected courses" : "Add user to courses"}
                            </MDButton>
                          </MDBox>
                        )}
                      </MDBox>
                      <Divider />
                      <MDBox sx={{ display: "flex", flexWrap: "wrap" }}>
                        {addCourse &&
                          selectedCoursesRowIds.length > 0 &&
                          selectedCoursesRowIds.flatMap((course, index) => (
                            <Chip
                              key={`${course.id}-${index}`}
                              label={course.name}
                              variant="outlined"
                              color="info"
                              onDelete={() => handleChipDelete(course)}
                              sx={{ marginBottom: 1, marginRight: 1 }}
                            />
                          ))}
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
                                  <MDButton
                                    onClick={() => {
                                      handleUserRowSelect(row.original);
                                    }}
                                    iconOnly
                                  >
                                    {selectedUserRowIds.includes(row.original) ? (
                                      <CheckBoxIcon sx={{ height: 20, width: 20 }} />
                                    ) : (
                                      <CheckBoxOutlineBlankIcon sx={{ height: 20, width: 20 }} />
                                    )}
                                  </MDButton>
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
                                  <MDButton
                                    onClick={() => {
                                      handleCoursesRowSelect(row.original);
                                    }}
                                    iconOnly
                                  >
                                    {selectedCoursesRowIds.includes(row.original) ? (
                                      <CheckBoxIcon sx={{ height: 20, width: 20 }} />
                                    ) : (
                                      <CheckBoxOutlineBlankIcon sx={{ height: 20, width: 20 }} />
                                    )}
                                  </MDButton>
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
