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
import { useContext, useEffect, useRef, useState } from "react";
import MDSnackbar from "components/MDSnackbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Autocomplete, CircularProgress, Divider, Grid, TextField } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ErrorContext from "context/ErrorProvider";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function EditCourse({ loading, setLoading }) {
  const [manage, setManage] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  const [description, setDescription] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [teacher, setTeacher] = useState({});
  const [newTeacher, setNewTeacher] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [members, setMembers] = useState([]);
  const [changed, setChanged] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [addMembers, setAddMembers] = useState(false);
  const [membersToAdd, setMembersToAdd] = useState([]);

  const [reload, setReload] = useState(false);

  const { showErrorNotification, showInfoNotification } = useContext(ErrorContext);

  const [successSB, setSuccessSB] = useState(false);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  useEffect(() => {
    if (course) {
      setName(course.name);
      setNewName(course.name);
      setDescription(course.description);
      setNewDescription(course.description);
      axiosPrivate
        .get(`users/${course.teacherId}`)
        .then((response) => {
          setTeacher(response.data);
          setNewTeacher(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axiosPrivate
        .get(`courses/${course.id}/members`)
        .then((response) => {
          const newRows = response.data.map((row) => ({ ...row, isSelected: false }));
          setMembers(newRows);
          axiosPrivate
            .get("admin/students")
            .then((res) => {
              const getStudents = res.data.filter(
                (student) => !newRows.some((member) => member._id === student._id)
              );
              setAllStudents(getStudents);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });

      axiosPrivate
        .get("users/teachers")
        .then((response) => {
          setTeachersList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [reload]);

  useEffect(() => {
    const hasChanges = newDescription !== description || newName !== name || newTeacher !== teacher;
    setChanged(hasChanges);
  }, [newDescription, newName, newTeacher]);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Course Created"
      content="Course created successfully"
      dateTime="now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCourse = { name, description, teacherId: teacher };
      const response = await axiosPrivate.post(
        process.env.REACT_APP_CREATE_COURSE_URL,
        JSON.stringify(newCourse),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response))
      // clear state and controlled inputs
      setChanged(false);
      setLoading(!loading);
      openSuccessSB();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Emailname Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const handleSelectAll = () => {
    if (selectedRowIds.length < members.length) {
      setSelectedRowIds(members.map((row) => row._id));
    } else {
      setSelectedRowIds([]);
    }
  };

  const handleRemoveMembers = () => {
    axiosPrivate
      .post(`/admin/${course.id}/members`, { memberIds: selectedRowIds })
      .then((response) => {
        if (response.status === 200) showInfoNotification(response.data.message);
        else showErrorNotification(response.data.message);
        setReload(!reload);
      });
  };

  const handleRowSelect = (rowId) => {
    if (!selectedRowIds.includes(rowId)) {
      // add row ID to selectedRowIds if it's not already in the array
      setSelectedRowIds([...selectedRowIds, rowId]);
    } else {
      // remove row ID from selectedRowIds if it's in the array
      setSelectedRowIds(selectedRowIds.filter((id) => id !== rowId));
    }
  };

  const addUserToMembers = (user) => {
    if (!membersToAdd.includes(user)) setMembersToAdd([...membersToAdd, user]);
    else {
      setMembersToAdd(membersToAdd.filter((member) => member !== user));
    }
  };

  const deleteCourse = () => {
    axiosPrivate.delete(`/admin/delete-course/${course.id}`).then((response) => {
      console.log(response);
      navigate(-1);
    });
  };

  const openImport = () => {
    const courseInfo = {
      id: course.id,
      description,
      name,
    };

    navigate("/admin/import-members", { state: courseInfo });
  };

  const handleAddMembers = async () => {
    const newMembers = membersToAdd.map((row) => row._id);
    await axiosPrivate
      .put(`admin/${course.id}/members`, { memberIds: newMembers })
      .then((response) => {
        if (response.status === 500) showErrorNotification(response.data.message);
        else showInfoNotification(response.data.message);
      });
    setMembersToAdd([]);
    setReload(!reload);
  };

  return (
    <PageLayout>
      <DefaultNavbar routes={pageRoutes} transparent />
      <MDBox my={3} mt={12} ml={1} mr={1}>
        <Card sx={{ marginTop: 3 }}>
          <MDBox ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </MDBox>
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
              Edit Course
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            {course ? (
              <MDBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={8} lg={10}>
                    {edit ? (
                      <MDBox display="flex" flexDirection="column">
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Name"
                            variant="standard"
                            required
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox mb={2}>
                          <MDInput
                            type="text"
                            label="Description"
                            multiline
                            variant="standard"
                            value={newDescription}
                            required
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox pr={1}>
                          <Autocomplete
                            disablePortal
                            options={teachersList}
                            getOptionLabel={(user) => `${user.name} ${user.surname}`}
                            onChange={(event, value) => setNewTeacher(value ? value._id : "")}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={`${newTeacher.name} ${newTeacher.surname}`}
                              />
                            )}
                          />
                        </MDBox>
                      </MDBox>
                    ) : (
                      <MDBox display="flex" flexDirection="column">
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
                        {description && (
                          <MDBox p={2}>
                            <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <MDTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Description
                              </MDTypography>
                            </MDBox>
                            <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <MDTypography color="text" variant="body2">
                                {description}
                              </MDTypography>
                            </MDBox>
                          </MDBox>
                        )}
                        <MDBox p={2}>
                          <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <MDTypography
                              component="label"
                              variant="h6"
                              fontWeight="medium"
                              color="text"
                            >
                              Teacher
                            </MDTypography>
                          </MDBox>
                          <MDBox sx={{ overflow: "auto", maxHeight: 250 }}>
                            <MDTypography color="text" variant="body2">
                              {teacher.name} {teacher.surname}
                            </MDTypography>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    )}
                  </Grid>
                  <Grid item xs={4} lg={2} textAlign="center" display="flex" flexDirection="column">
                    {!edit ? (
                      <MDBox mt={4} mb={1} textAlign="center">
                        <MDButton
                          variant="gradient"
                          color="error"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Go back
                        </MDButton>
                      </MDBox>
                    ) : (
                      <MDBox mt={4} mb={1} textAlign="center">
                        <MDButton
                          variant="contained"
                          color="success"
                          disabled={!changed || !newName || !newDescription || !newTeacher}
                          onClick={() => handleSubmit()}
                        >
                          Save changes
                        </MDButton>
                      </MDBox>
                    )}

                    <MDBox mt={1} mb={1} textAlign="center">
                      <MDButton
                        variant="contained"
                        color="warning"
                        onClick={() => {
                          setEdit(!edit);
                          setNewName(name);
                          setNewDescription(description);
                          setNewTeacher(teacher);
                        }}
                      >
                        {!edit ? "Edit" : "Cancel"}
                      </MDButton>
                    </MDBox>
                    {edit && (
                      <MDBox mt={1} mb={1} textAlign="center">
                        <MDButton variant="contained" color="error" onClick={() => deleteCourse()}>
                          Delete
                        </MDButton>
                      </MDBox>
                    )}
                  </Grid>
                </Grid>
                <MDBox mt={5}>
                  <MDBox>
                    <MDButton
                      sx={{ margin: 1 }}
                      color={manage ? "warning" : "success"}
                      onClick={() => {
                        setManage(!manage);
                        setAddMembers(false);
                      }}
                    >
                      {manage ? "Cancel" : "Manage members"}
                    </MDButton>
                  </MDBox>
                  <Divider />

                  {manage ? (
                    <MDBox mt={2}>
                      <MDBox display="flex">
                        {!addMembers && (
                          <MDButton
                            color="error"
                            disabled={!selectedRowIds.length}
                            sx={{ margin: 1 }}
                            onClick={() => handleRemoveMembers()}
                          >
                            Remove selected members
                          </MDButton>
                        )}
                        <MDButton
                          color="info"
                          sx={{ margin: 1 }}
                          onClick={() => setAddMembers(!addMembers)}
                        >
                          {!addMembers ? "Add members" : "Go back"}
                        </MDButton>
                        {addMembers && (
                          <MDButton
                            color="info"
                            sx={{ margin: 1 }}
                            onClick={() => openImport()}
                            endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
                          >
                            <MDTypography
                              variant="button"
                              sx={{ color: "#FFFFFF" }}
                              fontWeight="medium"
                            >
                              Import members (CSV)
                            </MDTypography>
                          </MDButton>
                        )}
                      </MDBox>

                      {!addMembers ? (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: (
                                  <MDBox>
                                    <MDButton
                                      onClick={() => handleSelectAll()}
                                      startIcon={
                                        selectedRowIds.length === members.length ? (
                                          <CheckBoxIcon sx={{ height: 25, width: 25 }} />
                                        ) : (
                                          <CheckBoxOutlineBlankIcon
                                            sx={{ height: 25, width: 25 }}
                                          />
                                        )
                                      }
                                    >
                                      <MDTypography variant="button" fontWeight="medium">
                                        Select All
                                      </MDTypography>
                                    </MDButton>
                                  </MDBox>
                                ),
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <MDButton
                                    onClick={() => {
                                      handleRowSelect(row.original._id);
                                    }}
                                    iconOnly
                                  >
                                    {selectedRowIds.includes(row.original._id) ? (
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
                              { Header: "surname", accessor: "surname" },
                              { Header: "studentNumber", accessor: "studentNumber" },
                            ],
                            rows: members,
                          }}
                          entriesPerPage={false}
                          canSearch
                        />
                      ) : (
                        <Grid container spacing={1}>
                          <Grid item lg={8} xs={12}>
                            <MDBox
                              variant="gradient"
                              bgColor="secondary"
                              borderRadius="lg"
                              coloredShadow="success"
                              mt={-3}
                              p={1}
                              mb={1}
                              my={3}
                              textAlign="center"
                            >
                              <MDTypography variant="h6" fontWeight="medium" color="white">
                                AVAILABLE STUDENTS
                              </MDTypography>
                            </MDBox>
                            {allStudents ? (
                              <DataTable
                                table={{
                                  columns: [
                                    { Header: "name", accessor: "name" },
                                    { Header: "surname", accessor: "surname" },
                                    { Header: "studentNumber", accessor: "studentNumber" },
                                    {
                                      Header: "action",
                                      accessor: "action",
                                      width: "15%",
                                      Cell: ({ row }) => (
                                        <MDButton
                                          onClick={() => addUserToMembers(row.original)}
                                          disabled={
                                            membersToAdd.includes(row.original) ||
                                            members.some((member) => allStudents.includes(member))
                                          }
                                          endIcon={
                                            <ArrowForwardIcon sx={{ height: 20, width: 20 }} />
                                          }
                                          color="success"
                                        >
                                          <MDTypography
                                            variant="button"
                                            sx={{ color: "#FFFFFF" }}
                                            fontWeight="medium"
                                          >
                                            Add
                                          </MDTypography>
                                        </MDButton>
                                      ),
                                    },
                                  ],
                                  rows: allStudents,
                                }}
                                entriesPerPage={false}
                                canSearch
                              />
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
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <MDBox
                              variant="gradient"
                              bgColor="secondary"
                              borderRadius="lg"
                              coloredShadow="success"
                              mt={-3}
                              p={1}
                              mb={1}
                              my={3}
                              textAlign="center"
                            >
                              <MDTypography variant="h6" fontWeight="medium" color="white">
                                SELECTED
                              </MDTypography>
                            </MDBox>
                            <MDBox>
                              <MDBox display="flex" justifyContent="space-between" m={2}>
                                <MDButton
                                  onClick={() => setMembersToAdd([])}
                                  startIcon={<ClearIcon sx={{ height: 20, width: 20 }} />}
                                  color="error"
                                  disabled={membersToAdd.length === 0}
                                >
                                  <MDTypography
                                    variant="button"
                                    sx={{ color: "#FFFFFF" }}
                                    fontWeight="medium"
                                  >
                                    Remove All
                                  </MDTypography>
                                </MDButton>
                                <MDBox>
                                  <MDTypography variant="button" fontWeight="medium">
                                    Selected: {membersToAdd.length}
                                  </MDTypography>
                                </MDBox>
                              </MDBox>

                              <DataTable
                                table={{
                                  columns: [
                                    {
                                      Header: "action",
                                      accessor: "action",
                                      width: "15%",
                                      Cell: ({ row }) => (
                                        <MDButton
                                          onClick={() => addUserToMembers(row.original)}
                                          startIcon={
                                            <ArrowBackIcon sx={{ height: 20, width: 20 }} />
                                          }
                                          color="error"
                                          variant="outlined"
                                        >
                                          <MDTypography
                                            variant="button"
                                            sx={{ color: "#f65f53" }}
                                            fontWeight="medium"
                                          >
                                            Remove
                                          </MDTypography>
                                        </MDButton>
                                      ),
                                    },
                                    { Header: "name", accessor: "name" },
                                    { Header: "surname", accessor: "surname" },
                                    { Header: "studentNumber", accessor: "studentNumber" },
                                  ],
                                  rows: membersToAdd,
                                }}
                                entriesPerPage={false}
                              />
                              <MDButton
                                onClick={() => handleAddMembers()}
                                color="success"
                                disabled={membersToAdd.length === 0}
                                fullWidth
                              >
                                Add selected
                              </MDButton>
                            </MDBox>
                          </Grid>
                        </Grid>
                      )}
                    </MDBox>
                  ) : (
                    <DataTable
                      table={{
                        columns: [
                          { Header: "name", accessor: "name" },
                          { Header: "surname", accessor: "surname" },
                          { Header: "studentNumber", accessor: "studentNumber" },
                        ],
                        rows: members,
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
          {renderSuccessSB}
        </Card>
      </MDBox>
    </PageLayout>
  );
}

export default EditCourse;
