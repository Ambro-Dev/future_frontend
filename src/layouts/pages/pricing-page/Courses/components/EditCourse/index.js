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
import { useEffect, useRef, useState } from "react";
import MDSnackbar from "components/MDSnackbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Autocomplete, Grid, TextField } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import pageRoutes from "page.routes";
import { CheckBox } from "@mui/icons-material";

function EditCourse({ loading, setLoading }) {
  const axiosPrivate = useAxiosPrivate();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teacher, setTeacher] = useState({});
  const [teachersList, setTeachersList] = useState([]);
  const [members, setMembers] = useState([]);

  const [successSB, setSuccessSB] = useState(false);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  useEffect(() => {
    console.log(course);
    if (course) {
      setName(course.name);
      setDescription(course.description);
      axiosPrivate
        .get(`users/${course.teacherId}`)
        .then((response) => {
          setTeacher(response.data);
        })
        .catch((error) => {
          console.error(error);
        });

      axiosPrivate
        .get(`courses/${course.id}/members`)
        .then((response) => {
          setMembers(response.data);
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
  }, [loading]);

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
      console.log(newCourse);
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
      setName("");
      setDescription("");
      setTeacher("");
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
                  <Grid item xs={10} lg={10}>
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
                            label="Description"
                            multiline
                            variant="standard"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                          />
                        </MDBox>
                        <MDBox pr={1}>
                          <Autocomplete
                            disablePortal
                            options={teachersList}
                            getOptionLabel={(user) => `${user.name} ${user.surname}`}
                            onChange={(event, value) => setTeacher(value ? value._id : "")}
                            renderInput={(params) => (
                              <TextField {...params} label={`${teacher.name} ${teacher.surname}`} />
                            )}
                          />
                        </MDBox>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    lg={2}
                    justifyContent="center"
                    textAlign="center"
                    display="flex"
                    flexDirection="column"
                  >
                    <MDBox mt={4} mb={1} textAlign="center">
                      <MDButton
                        variant="gradient"
                        color="error"
                        onClick={() => {
                          navigate(-1);
                        }}
                      >
                        Cancel
                      </MDButton>
                    </MDBox>
                    <MDButton
                      sx={{ margin: 2 }}
                      variant="contained"
                      color="warning"
                      onClick={() => setEdit(!edit)}
                    >
                      Edit
                    </MDButton>
                    <MDButton sx={{ margin: 2 }} variant="contained" color="error">
                      Delete
                    </MDButton>
                  </Grid>
                </Grid>
                <MDBox mt={5}>
                  <MDButton color="success">Manage members</MDButton>
                  <DataTable
                    table={{
                      columns: [
                        {
                          Header: "",
                          accessor: "checkbox",
                          Cell: ({ row }) => (
                            <CheckBox
                              checked={row.isSelected}
                              onChange={() => {
                                console.log(row);
                              }}
                            />
                          ),
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
                </MDBox>

                <MDBox mt={4} mb={1}>
                  <MDButton
                    variant="gradient"
                    color="success"
                    disabled={!!(!name || !description || !teacher)}
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Create
                  </MDButton>
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
