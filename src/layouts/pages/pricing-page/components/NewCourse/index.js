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
import { Autocomplete, TextField } from "@mui/material";

function NewCourse({ visible, setVisible, loading, setLoading }) {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const [teacher, setTeacher] = useState("");

  const [successSB, setSuccessSB] = useState(false);
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  useEffect(() => {
    axiosPrivate
      .get("users/teachers")
      .then((response) => {
        setTeachersList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    <Card sx={{ marginTop: 3 }}>
      <MDBox ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </MDBox>
      <MDBox
        variant="gradient"
        bgColor="info"
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
          Create new course
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form">
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
              renderInput={(params) => <TextField {...params} label="Teacher" />}
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
          <MDBox mt={4} mb={1} textAlign="center">
            <MDButton
              variant="gradient"
              color="error"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Cancel
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      {renderSuccessSB}
    </Card>
  );
}

export default NewCourse;
