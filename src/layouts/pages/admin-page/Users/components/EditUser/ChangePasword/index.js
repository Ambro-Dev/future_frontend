/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";
import DLButton from "components/DLButton";
import { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DLSnackbar from "components/DLSnackbar";
import { IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAxiosPrivate from "hooks/useAxiosPrivate";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;

function ChangePassword({ setChngPassword, chngPassword, userId }) {
  const [successSB, setSuccessSB] = useState(false);
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [seePasswords, setSeePasswords] = useState(false);

  const [repeatPwd, setRepeatPwd] = useState("");
  const [validRepeatPwd, setValidRepeatPwd] = useState(false);

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
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidRepeatPwd(PWD_REGEX.test(repeatPwd) && pwd === repeatPwd);
  }, [repeatPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, repeatPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    const v2 = PWD_REGEX.test(repeatPwd);
    if (pwd !== repeatPwd || !v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUser = { id: userId, newPassword: pwd };
      await axiosPrivate.post(process.env.REACT_APP_ADMIN_CHANGE_PASSWORD, newUser);
      setPwd("");
      openSuccessSB();
    } catch (err) {
      if (err?.response) {
        setErrMsg(err.response?.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <DLBox>
      <DLBox ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </DLBox>
      <DLBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        my={3}
        textAlign="start"
      >
        <DLTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Change Password
        </DLTypography>
        <DLTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </DLTypography>
      </DLBox>
      <DLBox pt={4} pb={3} px={3}>
        <DLBox>
          <DLBox mb={2} display="flex">
            <DLInput
              type={seePasswords ? "text" : "password"}
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
          <DLBox mb={2} display="flex">
            <DLInput
              type={seePasswords ? "text" : "password"}
              label="Repeat Password"
              variant="standard"
              onChange={(e) => setRepeatPwd(e.target.value)}
              value={repeatPwd}
              required
              aria-invalid={validRepeatPwd && validPwd === validRepeatPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              fullWidth
              helperText="Must be identical as password above"
            />
            <CheckIcon color="success" style={{ display: validRepeatPwd ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validRepeatPwd || !repeatPwd ? "none" : "block" }}
            />
          </DLBox>
          <DLBox mt={4} mb={1} textAlign="end">
            <IconButton
              variant="gradient"
              color="info"
              disabled={!pwd || !repeatPwd}
              onClick={() => setSeePasswords(!seePasswords)}
            >
              {!seePasswords ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </DLBox>
          <DLBox mt={4} mb={1} textAlign="start">
            <DLButton
              variant="gradient"
              color="success"
              disabled={!!(!validPwd || !validRepeatPwd)}
              onClick={handleSubmit}
            >
              Change password
            </DLButton>
          </DLBox>
          <DLBox mt={4} mb={1} textAlign="start">
            <DLButton
              variant="gradient"
              color="error"
              onClick={() => setChngPassword(!chngPassword)}
            >
              Cancel
            </DLButton>
          </DLBox>
        </DLBox>
      </DLBox>
      {renderSuccessSB}
    </DLBox>
  );
}

export default ChangePassword;
