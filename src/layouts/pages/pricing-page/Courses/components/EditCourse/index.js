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
import { Autocomplete, CircularProgress, Divider, Grid, TextField } from "@mui/material";
import DataTable from "utils/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "utils/LayoutContainers/PageLayout";
import DefaultNavbar from "utils/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ErrorContext from "context/ErrorProvider";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function EditCourse() {
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

  const { showErrorNotification, showInfoNotification, showSuccessNotification } =
    useContext(ErrorContext);

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

  const handleSubmit = async () => {
    try {
      const newCourse = {
        id: course.id,
        name: newName !== name ? newName : undefined,
        description: newDescription !== description ? newDescription : undefined,
        teacherId: newTeacher !== teacher ? newTeacher : undefined,
      };
      await axiosPrivate
        .put(process.env.REACT_APP_CHANGE_COURSE_URL, newCourse)
        .then((response) => {
          if (response.status === 200) {
            showSuccessNotification(response.data.message);
            setEdit(!edit);
          } else showErrorNotification(response.data.message);
        });
      // clear state and controlled inputs
      setChanged(false);
    } catch (err) {
      if (!err?.response) {
        showErrorNotification("Changing failed, server error");
      } else {
        showInfoNotification(err.response.data.message);
      }
    }
    setReload(!reload);
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
              Edit Course
            </DLTypography>
          </DLBox>

          <DLBox pt={4} pb={3} px={3}>
            {course ? (
              <DLBox component="form" role="form">
                <Grid container spacing={1}>
                  <Grid item xs={8} lg={10}>
                    {edit ? (
                      <DLBox display="flex" flexDirection="column">
                        <DLBox mb={2}>
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
                        <DLBox mb={2}>
                          <DLInput
                            type="text"
                            label="Description"
                            multiline
                            variant="standard"
                            value={newDescription}
                            required
                            onChange={(e) => setNewDescription(e.target.value)}
                            fullWidth
                          />
                        </DLBox>
                        <DLBox pr={1}>
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
                        </DLBox>
                      </DLBox>
                    ) : (
                      <DLBox display="flex" flexDirection="column">
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
                        {description && (
                          <DLBox p={2}>
                            <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                              <DLTypography
                                component="label"
                                variant="h6"
                                fontWeight="medium"
                                color="text"
                              >
                                Description
                              </DLTypography>
                            </DLBox>
                            <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                              <DLTypography color="text" variant="body2">
                                {description}
                              </DLTypography>
                            </DLBox>
                          </DLBox>
                        )}
                        <DLBox p={2}>
                          <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                            <DLTypography
                              component="label"
                              variant="h6"
                              fontWeight="medium"
                              color="text"
                            >
                              Teacher
                            </DLTypography>
                          </DLBox>
                          <DLBox sx={{ overflow: "auto", maxHeight: 250 }}>
                            <DLTypography color="text" variant="body2">
                              {teacher.name} {teacher.surname}
                            </DLTypography>
                          </DLBox>
                        </DLBox>
                      </DLBox>
                    )}
                  </Grid>
                  <Grid item xs={4} lg={2} textAlign="center" display="flex" flexDirection="column">
                    {!edit ? (
                      <DLBox mt={4} mb={1} textAlign="center">
                        <DLButton
                          variant="gradient"
                          color="error"
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          Go back
                        </DLButton>
                      </DLBox>
                    ) : (
                      <DLBox mt={4} mb={1} textAlign="center">
                        <DLButton
                          variant="contained"
                          color="success"
                          disabled={!changed || !newName || !newDescription || !newTeacher}
                          onClick={handleSubmit}
                        >
                          Save changes
                        </DLButton>
                      </DLBox>
                    )}

                    <DLBox mt={1} mb={1} textAlign="center">
                      <DLButton
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
                      </DLButton>
                    </DLBox>
                    {edit && (
                      <DLBox mt={1} mb={1} textAlign="center">
                        <DLButton variant="contained" color="error" onClick={() => deleteCourse()}>
                          Delete
                        </DLButton>
                      </DLBox>
                    )}
                  </Grid>
                </Grid>
                <DLBox mt={5}>
                  <DLBox>
                    <DLButton
                      sx={{ margin: 1 }}
                      color={manage ? "warning" : "success"}
                      onClick={() => {
                        setManage(!manage);
                        setAddMembers(false);
                      }}
                    >
                      {manage ? "Cancel" : "Manage members"}
                    </DLButton>
                  </DLBox>
                  <Divider />

                  {manage ? (
                    <DLBox mt={2}>
                      <DLBox display="flex">
                        {!addMembers && (
                          <DLButton
                            color="error"
                            disabled={!selectedRowIds.length}
                            sx={{ margin: 1 }}
                            onClick={() => handleRemoveMembers()}
                          >
                            Remove selected members
                          </DLButton>
                        )}
                        <DLButton
                          color="info"
                          sx={{ margin: 1 }}
                          onClick={() => setAddMembers(!addMembers)}
                        >
                          {!addMembers ? "Add members" : "Go back"}
                        </DLButton>
                        {addMembers && (
                          <DLButton
                            color="info"
                            sx={{ margin: 1 }}
                            onClick={() => openImport()}
                            endIcon={<AddIcon sx={{ height: 20, width: 20 }} />}
                          >
                            <DLTypography
                              variant="button"
                              sx={{ color: "#FFFFFF" }}
                              fontWeight="medium"
                            >
                              Import members (CSV)
                            </DLTypography>
                          </DLButton>
                        )}
                      </DLBox>

                      {!addMembers ? (
                        <DataTable
                          table={{
                            columns: [
                              {
                                Header: (
                                  <DLBox>
                                    <DLButton
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
                                      <DLTypography variant="button" fontWeight="medium">
                                        Select All
                                      </DLTypography>
                                    </DLButton>
                                  </DLBox>
                                ),
                                accessor: "checkbox",
                                Cell: ({ row }) => (
                                  <DLButton
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
                                  </DLButton>
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
                            <DLBox
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
                              <DLTypography variant="h6" fontWeight="medium" color="white">
                                AVAILABLE STUDENTS
                              </DLTypography>
                            </DLBox>
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
                                        <DLButton
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
                                          <DLTypography
                                            variant="button"
                                            sx={{ color: "#FFFFFF" }}
                                            fontWeight="medium"
                                          >
                                            Add
                                          </DLTypography>
                                        </DLButton>
                                      ),
                                    },
                                  ],
                                  rows: allStudents,
                                }}
                                entriesPerPage={false}
                                canSearch
                              />
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
                          </Grid>
                          <Grid item lg={4} xs={12}>
                            <DLBox
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
                              <DLTypography variant="h6" fontWeight="medium" color="white">
                                SELECTED
                              </DLTypography>
                            </DLBox>
                            <DLBox>
                              <DLBox display="flex" justifyContent="space-between" m={2}>
                                <DLButton
                                  onClick={() => setMembersToAdd([])}
                                  startIcon={<ClearIcon sx={{ height: 20, width: 20 }} />}
                                  color="error"
                                  disabled={membersToAdd.length === 0}
                                >
                                  <DLTypography
                                    variant="button"
                                    sx={{ color: "#FFFFFF" }}
                                    fontWeight="medium"
                                  >
                                    Remove All
                                  </DLTypography>
                                </DLButton>
                                <DLBox>
                                  <DLTypography variant="button" fontWeight="medium">
                                    Selected: {membersToAdd.length}
                                  </DLTypography>
                                </DLBox>
                              </DLBox>

                              <DataTable
                                table={{
                                  columns: [
                                    {
                                      Header: "action",
                                      accessor: "action",
                                      width: "15%",
                                      Cell: ({ row }) => (
                                        <DLButton
                                          onClick={() => addUserToMembers(row.original)}
                                          startIcon={
                                            <ArrowBackIcon sx={{ height: 20, width: 20 }} />
                                          }
                                          color="error"
                                          variant="outlined"
                                        >
                                          <DLTypography
                                            variant="button"
                                            sx={{ color: "#f65f53" }}
                                            fontWeight="medium"
                                          >
                                            Remove
                                          </DLTypography>
                                        </DLButton>
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
                              <DLButton
                                onClick={() => handleAddMembers()}
                                color="success"
                                disabled={membersToAdd.length === 0}
                                fullWidth
                              >
                                Add selected
                              </DLButton>
                            </DLBox>
                          </Grid>
                        </Grid>
                      )}
                    </DLBox>
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
                </DLBox>
              </DLBox>
            ) : (
              <DLBox>No course selected</DLBox>
            )}
          </DLBox>
        </Card>
      </DLBox>
    </PageLayout>
  );
}

export default EditCourse;
