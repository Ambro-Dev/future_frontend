/* eslint-disable react/no-array-index-key */
import { ImageList, ImageListItem } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import availableImages from "./availableImages";

function CourseImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(availableImages);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <MDBox>
      <MDTypography varinat="h2">Select Course Image</MDTypography>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {availableImages.map((item) => (
          <ImageListItem key={item}>
            <img
              src={item}
              srcSet={item}
              loading="lazy"
              alt="imagePick"
              ocClick={handleImageClick}
            />
          </ImageListItem>
        ))}
      </ImageList>
      {selectedImage && <p>You have selected {selectedImage} as the course image.</p>}
    </MDBox>
  );
}

export default CourseImageSelector;
