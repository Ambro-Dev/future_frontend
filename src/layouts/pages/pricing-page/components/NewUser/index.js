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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "api/axios";
import MDSnackbar from "components/MDSnackbar";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;

function NewUser({ visible, setVisible }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [successSB, setSuccessSB] = useState(false);
  const [role, setRole] = useState("");
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
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
    openSuccessSB();
  }, [success]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

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
      setSuccess(true);
      // clear state and controlled inputs
      setEmail("");
      setPwd("");
      setName("");
      setSurname("");
      setStudentNumber("");
      setRole("");
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
          Create new email
        </MDTypography>
        <MDTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <FormControl required sx={{ paddingBottom: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ paddingTop: 2, paddingBottom: 2 }}
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value={{ Student: 1984 }}>Student</MenuItem>
            <MenuItem value={{ Teacher: 5150 }}>Teacher</MenuItem>
            <MenuItem value={{ Admin: 1001 }}>Admin</MenuItem>
          </Select>
        </FormControl>
        <MDBox component="form" role="form">
          <MDBox mb={2}>
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
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Surname"
              variant="standard"
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Student Number"
              variant="standard"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              fullWidth
              required={role === "Student"}
              style={{ display: role === "Teacher" || role === "Admin" ? "none" : "block" }}
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
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
            >
              <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </MDInput>
          </MDBox>

          <MDBox mb={2}>
            <MDInput
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
            >
              <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
              <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
            </MDInput>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              variant="gradient"
              color="success"
              disabled={!!(!validEmail || !validPwd || !name || !surname || !role)}
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

export default NewUser;
