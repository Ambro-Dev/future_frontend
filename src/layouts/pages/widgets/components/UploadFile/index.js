/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
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

// Distance Learning React examples
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";
import { DropzoneDialog } from "mui-file-dropzone";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import image from "assets/images/icons/flags/EN.png";
import FileItem from "examples/Items/FileItem";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import MDSnackbar from "components/MDSnackbar";

function UploadFile({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "courseinfo" });
  const { auth } = useAuth();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [courseFiles, setCourseFiles] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const [successSB, setSuccessSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Upload File"
      content="File uploaded successfully!"
      dateTime="now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const handleDownload = (file) => {
    axiosPrivate
      .get(`files/file/${file.filename}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.originalname);
        document.body.appendChild(link);
        link.click();
      });
  };

  useEffect(() => {
    axiosPrivate.get(`files/${courseId}`).then((response) => {
      setCourseFiles(response.data);
    });
  }, [refreshFiles]);

  const handleSave = async (files) => {
    setOpen(false);
    const formData = new FormData();
    formData.append("file", files[0]);
    await axiosPrivate
      .post(`/files/${courseId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        openSuccessSB();
      });
    setRefreshFiles(!refreshFiles);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ height: "500px", overflow: "auto" }}>
      <MDBox pt={2} px={2} lineHeight={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <MDTypography
          color={darkMode ? "text" : "secondary"}
          variant="h6"
          fontWeight="medium"
          pt={1}
        >
          {t("files")}
        </MDTypography>
        {auth.roles.includes(5150) && <MDButton onClick={handleOpen}>{t("addfile")}</MDButton>}
        <DropzoneDialog
          open={open}
          onSave={handleSave}
          acceptedFiles={[
            "image/jpeg",
            "image/png",
            "image/bmp",
            "image/jpg",
            "application/vnd.ms-excel",
            "application/vnd.oasis.opendocument.text",
            "application/pdf",
            "text/csv",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/zip",
          ]}
          showPreviews
          maxFileSize={10000000}
          onClose={handleClose}
        />
      </MDBox>
      {renderSuccessSB}
      <MDBox p={2} sx={{ overflow: "auto" }}>
        {courseFiles ? (
          courseFiles.map((file) => {
            const extension = file.filename.split(".").pop();
            return (
              <FileItem
                key={file.filename}
                color="dark"
                icon={image}
                title={file.originalname}
                event={() => handleDownload(file)}
                eventDel={handleDownload}
                extension={extension}
                auth={auth}
              />
            );
          })
        ) : (
          <MDBox>{t("nofiles")}</MDBox>
        )}
      </MDBox>
    </Card>
  );
}

UploadFile.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default UploadFile;
