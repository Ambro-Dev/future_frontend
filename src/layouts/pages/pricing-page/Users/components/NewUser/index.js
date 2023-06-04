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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "api/axios";
import DLSnackbar from "components/DLSnackbar";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z]+$/;
const NUMBER_REGEX = /^\d+$/;

function NewUser({ visible, setVisible, loading, setLoading }) {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);

  const [studentNumber, setStudentNumber] = useState("");
  const [validStudentNumber, setValidStudentNumber] = useState(false);

  const [successSB, setSuccessSB] = useState(false);
  const [role, setRole] = useState({});
  const emailRef = useRef();
  const errRef = useRef();
  const [visibleRole, setVisibleRole] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <DLSnackbar
      color="success"
      icon="check"
      title="User Created"
      content="User created successfully"
      dateTime="now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidStudentNumber(NUMBER_REGEX.test(studentNumber));
  }, [studentNumber]);

  useEffect(() => {
    setValidSurname(NAME_REGEX.test(surname));
  }, [surname]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUser = { email, password: pwd, name, surname, roles: role, studentNumber };
      console.log(newUser);
      const response = await axios.post(
        process.env.REACT_APP_REGISTER_URL,
        JSON.stringify(newUser),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response))
      // clear state and controlled inputs
      setEmail("");
      setPwd("");
      setName("");
      setSurname("");
      setStudentNumber("");
      setRole({});
      setVisibleRole("");
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

  const handleRoleChange = (event) => {
    setVisibleRole(event.target.value);
    if (event.target.value === "Student") {
      setRole({ Student: 1984 });
      if (studentNumber === "") setValidStudentNumber(false);
    }
    if (event.target.value === "Teacher") {
      setRole({ Teacher: 5150 });
      setStudentNumber("");
      setValidStudentNumber(true);
    }
    if (event.target.value === "Admin") {
      setRole({ Admin: 1001 });
      setStudentNumber("");
      setValidStudentNumber(true);
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
          Create new user
        </DLTypography>
        <DLTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </DLTypography>
      </DLBox>
      <DLBox pt={4} pb={3} px={3}>
        <FormControl required sx={{ paddingBottom: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ paddingTop: 2, paddingBottom: 2 }}
            value={visibleRole}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
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
            <CheckIcon color="success" style={{ display: validName ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validName || !name ? "none" : "block" }} />
          </DLBox>
          <DLBox mb={2} display="flex">
            <DLInput
              type="text"
              label="Surname"
              variant="standard"
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
              fullWidth
            />
            <CheckIcon color="success" style={{ display: validSurname ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validSurname || !surname ? "none" : "block" }}
            />
          </DLBox>
          <DLBox
            mb={2}
            display="flex"
            style={{
              display: visibleRole === "Teacher" || visibleRole === "Admin" ? "none" : "block",
            }}
          >
            <DLInput
              type="text"
              label="Student Number"
              variant="standard"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              fullWidth
              required={role === "Student"}
            />
            <CheckIcon color="success" style={{ display: validStudentNumber ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validStudentNumber || !studentNumber ? "none" : "block" }}
            />
          </DLBox>
          <DLBox mb={2} display="flex">
            <DLInput
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              label="Email"
              variant="standard"
              fullWidth
            />
            <CheckIcon color="success" style={{ display: validEmail ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validEmail || !email ? "none" : "block" }} />
          </DLBox>

          <DLBox mb={2} display="flex">
            <DLInput
              type="password"
              label="Password"
              variant="standard"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              fullWidth
              helperText="8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ % & *"
            />
            <CheckIcon color="success" style={{ display: validPwd ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validPwd || !pwd ? "none" : "block" }} />
          </DLBox>
          <DLBox mt={4} mb={1}>
            <DLButton
              variant="gradient"
              color="success"
              disabled={
                !!(
                  !validEmail ||
                  !validPwd ||
                  !name ||
                  !surname ||
                  !role ||
                  !validName ||
                  !validSurname ||
                  !validStudentNumber
                )
              }
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

export default NewUser;
