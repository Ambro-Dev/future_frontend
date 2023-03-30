/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import React, { useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";

function UploadImage() {
  const axiosPrivate = useAxiosPrivate();
  const [file, setFile] = useState(null);
  const [inputContainsFile, setInputContainsFile] = useState(false);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [progress, setProgress] = useState(null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setInputContainsFile(true);
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", file);
    axiosPrivate
      .post(
        `/files/upload`,
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          onUploadProgress: (progressEvent) => {
            setProgress((progressEvent.loaded / progressEvent.total) * 100);
            console.log(
              "upload progress: ",
              Math.round((progressEvent.loaded / progressEvent.total) * 100)
            );
          },
        }
      )
      .then(({ data }) => {
        setImageId(data);
        setFile(null);
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log("db error");
          alert("db error");
        } else {
          console.log("other error: ", err);
        }
        setInputContainsFile(false);
        setCurrentlyUploading(false);
      });
  };

  const handleClick = () => {
    if (inputContainsFile) {
      setCurrentlyUploading(true);
      fileUploadHandler();
    }
  };

  return (
    <div className="regular">
      <div className="image-section">
        {imageId ? (
          <>
            <img className="image" src={`/api/image/${imageId}`} alt="regular version" />
            <a className="link" href={`/api/image/${imageId}`} target="_blank" rel="noreferrer">
              link
            </a>
          </>
        ) : (
          <p className="nopic">no regular version pic yet</p>
        )}
      </div>
      <div className="inputcontainer">
        {currentlyUploading ? (
          <img className="loadingdots" alt="upload in progress" />
        ) : (
          <>
            <input className="file-input" onChange={handleFile} type="file" name="file" id="file" />
            <label
              className={`inputlabel ${file && "file-selected"}`}
              htmlFor="file"
              onClick={handleClick}
            >
              {file ? <>SUBMIT</> : <>REGULAR VERSION</>}
            </label>
          </>
        )}
      </div>
    </div>
  );
}

export default UploadImage;
