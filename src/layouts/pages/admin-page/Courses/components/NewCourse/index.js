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
import { useContext, useEffect, useRef, useState } from "react";
import DLSnackbar from "components/DLSnackbar";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { Autocomplete, TextField } from "@mui/material";
import ErrorContext from "context/ErrorProvider";

function NewCourse({ visible, setVisible, loading, setLoading }) {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const [teacher, setTeacher] = useState("");
  const { showErrorNotification } = useContext(ErrorContext);
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
        showErrorNotification("Error", error.message);
      });
  }, []);

  const renderSuccessSB = (
    <DLSnackbar
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
      await axiosPrivate.post(process.env.REACT_APP_CREATE_COURSE_URL, JSON.stringify(newCourse), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
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
      <DLBox ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </DLBox>
      <DLBox
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
        <DLTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Create new course
        </DLTypography>
        <DLTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </DLTypography>
      </DLBox>
      <DLBox pt={4} pb={3} px={3}>
        <DLBox component="form" role="form">
          <DLBox mb={2} display="flex">
            <DLInput
              type="text"
              label="Name"
              variant="standard"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
          </DLBox>
          <DLBox mb={2} display="flex">
            <DLInput
              type="text"
              label="Description"
              variant="standard"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </DLBox>
          <DLBox pr={1}>
            <Autocomplete
              disablePortal
              options={teachersList}
              getOptionLabel={(user) => `${user.name} ${user.surname}`}
              onChange={(event, value) => setTeacher(value ? value._id : "")}
              renderInput={(params) => <TextField {...params} label="Teacher" />}
            />
          </DLBox>
          <DLBox mt={4} mb={1}>
            <DLButton
              variant="gradient"
              color="success"
              disabled={!!(!name || !description || !teacher)}
              onClick={handleSubmit}
              fullWidth
            >
              Create
            </DLButton>
          </DLBox>
          <DLBox mt={4} mb={1} textAlign="center">
            <DLButton
              variant="gradient"
              color="error"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Cancel
            </DLButton>
          </DLBox>
        </DLBox>
      </DLBox>
      {renderSuccessSB}
    </Card>
  );
}

export default NewCourse;
