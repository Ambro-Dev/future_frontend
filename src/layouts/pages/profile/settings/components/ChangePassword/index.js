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
import DLButton from "components/DLButton";
import DLInput from "components/DLInput";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ErrorContext from "context/ErrorProvider";
import useAuth from "hooks/useAuth";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import DLAlert from "components/DLAlert";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;

function ChangePassword() {
  const { t } = useTranslation("translation", { keyPrefix: "settings" });

  const { showSuccessNotification, showErrorNotification } = useContext(ErrorContext);

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [pwd, setPwd] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [seePasswords, setSeePasswords] = useState(false);
  const [repeatPwd, setRepeatPwd] = useState("");
  const [validRepeatPwd, setValidRepeatPwd] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [warningMsg, setWarningMsg] = useState("");

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
    setErrMsg("");
    setSuccessMsg("");
    setWarningMsg("");
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    const v2 = PWD_REGEX.test(repeatPwd);
    if (pwd !== repeatPwd || !v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    if (pwd === currentPwd || repeatPwd === currentPwd) {
      setWarningMsg("New password is the same as current password");
      return;
    }
    const newUser = { id: auth.userId, currentPassword: currentPwd, newPassword: pwd };
    await axiosPrivate
      .put("users/change-password", newUser)
      .then((response) => {
        if (response.data.status !== 200) {
          const error = new Error(response.data.message);
          throw error;
        } else {
          setPwd("");
          setCurrentPwd("");
          setRepeatPwd("");
          showSuccessNotification(response.data.message);
          setSuccessMsg(response.data.message);
        }
      })
      .catch((error) => {
        showErrorNotification("Error", error.message);
        setErrMsg(error.message);
      });
  };

  const passwordRequirements = [
    `${t("passreq1")}`,
    `${t("passreq2")}`,
    `${t("passreq3")}`,
    `${t("passreq4")}`,
  ];

  const renderPasswordRequirements = passwordRequirements.map((item, key) => {
    const itemKey = `element-${key}`;

    return (
      <DLBox key={itemKey} component="li" color="text" fontSize="1.25rem" lineHeight={1}>
        <DLTypography variant="button" color="text" fontWeight="regular" verticalAlign="middle">
          {item}
        </DLTypography>
      </DLBox>
    );
  });

  const alertContent = (message) => (
    <DLTypography variant="body2" fontWeight="medium" color="white">
      {message}
    </DLTypography>
  );

  return (
    <Card id="change-password">
      <DLBox p={3}>
        <DLTypography variant="h5">{t("changepass")}</DLTypography>
      </DLBox>
      <DLBox p={2}>
        {errMsg && (
          <DLAlert color="error" dismissible>
            {alertContent(errMsg)}
          </DLAlert>
        )}
        {successMsg && (
          <DLAlert color="success" dismissible>
            {alertContent(successMsg)}
          </DLAlert>
        )}
        {warningMsg && (
          <DLAlert color="warning" dismissible>
            {alertContent(warningMsg)}
          </DLAlert>
        )}
      </DLBox>

      <DLBox component="form" pb={3} px={3}>
        <DLBox mb={2} display="flex">
          <DLInput
            type={seePasswords ? "text" : "password"}
            label={t("currpass")}
            onChange={(e) => setCurrentPwd(e.target.value)}
            value={currentPwd}
            required
            aria-describedby="pwdnote"
            fullWidth
          />
        </DLBox>
        <DLBox mb={2} display="flex">
          <DLInput
            type={seePasswords ? "text" : "password"}
            label={t("newpass")}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            fullWidth
            helperText="8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ % & *"
          />
          <CheckIcon color="success" style={{ display: validPwd ? "block" : "none" }} />
          <CloseIcon color="error" style={{ display: validPwd || !pwd ? "none" : "block" }} />
        </DLBox>
        <DLBox mb={2} display="flex">
          <DLInput
            type={seePasswords ? "text" : "password"}
            label={t("confpass")}
            onChange={(e) => setRepeatPwd(e.target.value)}
            value={repeatPwd}
            required
            aria-invalid={validRepeatPwd && validPwd === validRepeatPwd ? "false" : "true"}
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
        <DLBox mt={6} mb={1}>
          <DLTypography variant="h5">{t("passreq")}</DLTypography>
        </DLBox>
        <DLBox mb={1}>
          <DLTypography variant="body2" color="text">
            {t("pleasefollow")}
          </DLTypography>
        </DLBox>
        <DLBox display="flex" justifyContent="space-between" alignItems="flex-end" flexWrap="wrap">
          <DLBox component="ul" m={0} pl={3.25} mb={{ xs: 8, sm: 0 }}>
            {renderPasswordRequirements}
          </DLBox>
          <DLBox ml="auto">
            <DLButton
              variant="gradient"
              color="dark"
              size="small"
              disabled={!!(!validPwd || !validRepeatPwd)}
              onClick={handleSubmit}
            >
              {t("update")}
            </DLButton>
          </DLBox>
        </DLBox>
      </DLBox>
    </Card>
  );
}

export default ChangePassword;
