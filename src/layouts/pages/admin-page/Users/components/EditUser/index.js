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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";
import DLButton from "components/DLButton";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Chip, Dialog, DialogActions, Divider, Grid, Stack } from "@mui/material";
import DataTable from "utils/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "utils/LayoutContainers/PageLayout";
import DefaultNavbar from "utils/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ErrorContext from "context/ErrorProvider";
import BlockIcon from "@mui/icons-material/Block";
import FooterAdmin from "layouts/pages/admin-page/FooterAdmin";
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
  const [newName, setNewName] = useState("");
  const [newSurname, setNewSurname] = useState("");
  const [newStudentNumber, setNewStudentNumber] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [roles, setRoles] = useState({});
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [addCourse, setAddCourse] = useState(false);
  const [chngPassword, setChngPassword] = useState(false);
  const [reload, setReload] = useState(false);
  const [changed, setChanged] = useState(false);

  const { showErrorNotification, showInfoNotification, showSuccessNotification } =
    useContext(ErrorContext);

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
          showErrorNotification("Error", error.message);
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
          showErrorNotification("Error", error.message);
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
            showErrorNotification("Error", error.message);
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
            showErrorNotification("Error", error.message);
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
        if (response.status === 500) showErrorNotification("Error", response.data.message);
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
        if (response.status === 500) showErrorNotification("Error", response.data.message);
        else showInfoNotification(response.data.message);
      });
    setSelectedCoursesRowIds([]);
    setReload(!reload);
  };

  useEffect(() => {
    const hasChanges =
      newSurname !== surname ||
      newName !== name ||
      newStudentNumber !== studentNumber ||
      newEmail !== email;
    setChanged(hasChanges);
  }, [newSurname, newName, newStudentNumber, newEmail]);

  const handleSubmitChanges = async () => {
    try {
      const newUser = {
        id: user.id,
        name: newName !== name ? newName : undefined,
        surname: newSurname !== surname ? newSurname : undefined,
        studentNumber: newStudentNumber !== studentNumber ? newStudentNumber : undefined,
        email: newEmail !== email ? newEmail : undefined,
      };
      await axiosPrivate.put(process.env.REACT_APP_CHANGE_USER_URL, newUser).then((response) => {
        if (response.status === 200) {
          showSuccessNotification(response.data.message);
          setEdit(!edit);
        } else showErrorNotification("Error", response.data.message);
      });
      // clear state and controlled inputs
      setChanged(false);
      setReload(!reload);
    } catch (err) {
      if (!err?.response) {
        showErrorNotification("Error", "Changing failed, server error");
      } else {
        showInfoNotification(err.response.data.message);
      }
    }
  };

  const handleBlockUser = async () => {
    await axiosPrivate.put(`/admin/${user.id}/block-user`).then((response) => {
      if (response.status === 400) showErrorNotification("Error", response.data.message);
      else if (response.status === 204) showErrorNotification("Error", response.data.message);
      else showSuccessNotification(response.data.message);
    });
    setReload(!reload);
  };

  const handleUnblockUser = async () => {
    await axiosPrivate.put(`/admin/${user.id}/unblock-user`).then((response) => {
      if (response.status === 400) showErrorNotification("Error", response.data.message);
      else if (response.status === 204) showErrorNotification("Error", response.data.message);
      else showSuccessNotification(response.data.message);
    });
    setReload(!reload);
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <DLBox my={3} mt={12} ml={1} mr={1}>
        <Card sx={{ marginTop: 3 }}>
          <DLBox
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
            <DLTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Edit User
            </DLTypography>
          </DLBox>

          <DLBox pt={4} pb={3} px={3}>
            {user ? (
              <DLBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={12} lg={chngPassword ? 4 : 10}>
                    {edit ? (
                      <>
                        <DLBox mb={2} display="flex">
                          <DLInput
                            type="text"
                            label="Name"
                            variant="standard"
                            required
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            fullWidth
                          />
                        </DLBox>
                        <DLBox mb={2} display="flex">
                          <DLInput
                            type="text"
                            label="Surname"
                            multiline
                            variant="standard"
                            value={newSurname}
                            required
                            onChange={(e) => setNewSurname(e.target.value)}
                            fullWidth
                          />
                        </DLBox>
                        <DLBox mb={2} display="flex">
                          <DLInput
                            type="text"
                            label="Email"
                            variant="standard"
                            required
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            fullWidth
                          />
                        </DLBox>
                        {studentNumber && (
                          <DLBox mb={2} display="flex">
                            <DLInput
                              type="text"
                              label="Student Number"
                              variant="standard"
                              required
                              value={newStudentNumber}
                              onChange={(e) => setNewStudentNumber(e.target.value)}
                              fullWidth
                            />
                          </DLBox>
                        )}
                      </>
                    ) : (
                      <>
                        <DLBox mb={2} display="flex">
                          <DLButton
                            variant="gradient"
                            color="info"
                            onClick={() => setChngPassword(true)}
                          >
                            Change password
                          </DLButton>
                        </DLBox>
                        {name && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Name
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {name}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
                        )}
                        {surname && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Surname
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {surname}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
                        )}
                        {email && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Email
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {email}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
                        )}
                        {studentNumber && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Student Number
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {studentNumber}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
                        )}
                        {roles && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Role
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {Object.values(roles).includes(5150) && "Teacher"}
                                {Object.values(roles).includes(1984) && "Student"}
                                {Object.values(roles).includes(1001) && "Admin"}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
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
                    {Object.values(roles).includes(4004) && (
                      <DLBox
                        display="flex"
                        justifyContent="center"
                        textAlign="center"
                        alignItems="center"
                      >
                        <DLTypography fontWeight="medium" mr={1}>
                          User blocked
                        </DLTypography>

                        <BlockIcon color="error" sx={{ height: 40, width: 40 }} />
                      </DLBox>
                    )}

                    <DLBox mt={4} mb={1} textAlign="center">
                      {!edit && (
                        <DLButton
                          variant="gradient"
                          color="error"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Go back
                        </DLButton>
                      )}
                    </DLBox>
                    <DLButton
                      sx={{ margin: 2 }}
                      color="warning"
                      onClick={() => {
                        setEdit(!edit);
                        setChngPassword(false);
                        if (!edit) {
                          setNewEmail(email);
                          setNewName(name);
                          setNewStudentNumber(studentNumber);
                          setNewSurname(surname);
                        }
                      }}
                    >
                      {!edit ? "Edit" : "Cancel"}
                    </DLButton>
                    {edit && (
                      <>
                        <DLBox>
                          <DLButton
                            sx={{ margin: 2 }}
                            variant="contained"
                            color={Object.values(roles).includes(4004) ? "info" : "error"}
                            onClick={
                              Object.values(roles).includes(4004)
                                ? handleUnblockUser
                                : handleBlockUser
                            }
                          >
                            {Object.values(roles).includes(4004) ? "Unblock user" : "Block user"}
                          </DLButton>
                        </DLBox>
                        <DLBox m={2} textAlign="center">
                          <DLButton
                            variant="contained"
                            color="success"
                            disabled={
                              !changed || !newName || !newSurname || !newStudentNumber || !newEmail
                            }
                            onClick={() => handleSubmitChanges()}
                          >
                            Save changes
                          </DLButton>
                        </DLBox>
                      </>
                    )}
                  </Grid>
                </Grid>
                <Divider />
                <DLBox mt={5}>
                  {Object.values(user.roles).includes(5150) ? (
                    <DLTypography
                      component="label"
                      variant="h4"
                      fontWeight="medium"
                      color="success"
                    >
                      Owner:
                    </DLTypography>
                  ) : (
                    <DLBox>
                      <DLBox
                        variant="gradient"
                        bgColor="success"
                        borderRadius="lg"
                        coloredShadow="success"
                        mt={-3}
                        p={1}
                        my={3}
                        textAlign="center"
                      >
                        <DLTypography variant="h5" fontWeight="medium" color="white">
                          User courses
                        </DLTypography>
                      </DLBox>
                      <DLBox sx={{ display: "flex" }}>
                        <DLButton
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
                        </DLButton>
                        {manage && (
                          <DLBox>
                            {!addCourse && (
                              <DLButton
                                sx={{ margin: 1 }}
                                color="error"
                                disabled={!selectedUserRowIds.length}
                                onClick={() => handleClickOpen()}
                              >
                                Remove selected courses
                              </DLButton>
                            )}

                            <Dialog open={open} onClose={handleClose}>
                              <DLBox key="dialog-card" sx={{ padding: 3 }}>
                                <DLBox
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
                                  <DLTypography
                                    key="title-text"
                                    variant="h4"
                                    fontWeight="medium"
                                    color="white"
                                  >
                                    Confirm operation
                                  </DLTypography>
                                </DLBox>
                                <DLBox key="title-description" m={2}>
                                  <DLTypography key="title-description-text" variant="button">
                                    Remove user from courses:
                                  </DLTypography>
                                </DLBox>
                                <DLBox key="content">
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
                                </DLBox>

                                <DialogActions>
                                  <DLButton
                                    onClick={handleClose}
                                    variant="outlined"
                                    color="warning"
                                  >
                                    Cancel
                                  </DLButton>
                                  <DLButton
                                    variant="outlined"
                                    color="success"
                                    onClick={handleRemoveFromCourses}
                                    autoFocus
                                  >
                                    Accept
                                  </DLButton>
                                </DialogActions>
                              </DLBox>
                            </Dialog>

                            <DLButton
                              color="info"
                              onClick={() => {
                                if (selectedCoursesRowIds.length > 0) handleAddToCourses();
                                else setAddCourse(true);
                              }}
                              sx={{ margin: 1 }}
                            >
                              {addCourse ? "Add user to selected courses" : "Add user to courses"}
                            </DLButton>
                          </DLBox>
                        )}
                      </DLBox>
                      <Divider />
                      <DLBox sx={{ display: "flex", flexWrap: "wrap" }}>
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
                      </DLBox>
                    </DLBox>
                  )}

                  {manage ? (
                    <DLBox>
                      {!addCourse && (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: "",
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <DLButton
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
                                  </DLButton>
                                ),
                                isCheckbox: true,
                                width: 10,
                              },
                              { Header: "name", accessor: "name" },
                              {
                                Header: "teacher",
                                accessor: "teacherId",
                                Cell: ({ row }) => (
                                  <DLBox>
                                    {row.original.teacherId.name} {row.original.teacherId.surname}
                                  </DLBox>
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
                                  <DLButton
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
                                  </DLButton>
                                ),
                                isCheckbox: true,
                                width: 10,
                              },
                              { Header: "name", accessor: "name" },
                              {
                                Header: "teacher",
                                accessor: "teacherId",
                                Cell: ({ row }) => (
                                  <DLBox>
                                    {row.original.teacherId.name} {row.original.teacherId.surname}
                                  </DLBox>
                                ),
                              },
                              {
                                Header: "members",
                                accessor: "members",
                                Cell: ({ row }) => <DLBox>{row.original.members.length}</DLBox>,
                              },
                            ],
                            rows: allCourses,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      )}
                    </DLBox>
                  ) : (
                    <DataTable
                      table={{
                        columns: [
                          { Header: "name", accessor: "name" },
                          {
                            Header: "teacher",
                            accessor: "teacherId",
                            Cell: ({ row }) => (
                              <DLBox>
                                {row.original.teacherId.name} {row.original.teacherId.surname}
                              </DLBox>
                            ),
                          },
                        ],
                        rows: courses,
                      }}
                      entriesPerPage={false}
                      canSearch
                    />
                  )}
                </DLBox>
              </DLBox>
            ) : (
              <DLBox>No course selected</DLBox>
            )}
          </DLBox>
        </Card>
      </DLBox>
      <FooterAdmin />
    </PageLayout>
  );
}

export default EditUser;
