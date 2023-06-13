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
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";

// Distance Learning React utils
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DLButton from "components/DLButton";
import { useMaterialUIController } from "context";
import { DropzoneDialog } from "mui-file-dropzone";
import useAxiosPrivate from "hooks/useAxiosPrivate";

import image from "assets/images/icons/flags/EN.png";
import FileItem from "utils/Items/FileItem";
import useAuth from "hooks/useAuth";
import { useTranslation } from "react-i18next";
import ErrorContext from "context/ErrorProvider";

function UploadFile({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "courseinfo" });
  const { auth } = useAuth();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [courseFiles, setCourseFiles] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const { showErrorNotification, showSuccessNotification } = useContext(ErrorContext);

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

  const handleDelete = (file) => {
    axiosPrivate
      .delete(`files/${file.id}/delete`)
      .then((response) => {
        showSuccessNotification(response.data.message);
        setRefreshFiles(!refreshFiles);
      })
      .catch((error) => {
        showErrorNotification("Error", error.message);
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
      .then((response) => {
        showSuccessNotification(response.data.message);
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
      <DLBox pt={2} px={2} lineHeight={1} sx={{ display: "flex", justifyContent: "space-between" }}>
        <DLTypography
          color={darkMode ? "text" : "secondary"}
          variant="h6"
          fontWeight="medium"
          pt={1}
        >
          {t("files")}
        </DLTypography>
        {auth.roles.includes(5150) && <DLButton onClick={handleOpen}>{t("addfile")}</DLButton>}
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
      </DLBox>
      <DLBox p={2} sx={{ overflow: "auto" }}>
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
                eventDel={() => handleDelete(file)}
                extension={extension}
                auth={auth}
              />
            );
          })
        ) : (
          <DLBox>{t("nofiles")}</DLBox>
        )}
      </DLBox>
    </Card>
  );
}

UploadFile.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default UploadFile;
