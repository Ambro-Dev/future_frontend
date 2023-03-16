/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

function UploadFile() {
  const axiosPrivate = useAxiosPrivate();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose file");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axiosPrivate.post("/files/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        },
      });

      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <div>File name: {fileName}</div>
      <div>Upload progress: {uploadProgress}%</div>
    </div>
  );
}

export default UploadFile;
