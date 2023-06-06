/* eslint-disable react/no-array-index-key */
import { ImageList, ImageListItem } from "@mui/material";
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import React, { useState } from "react";
import availableImages from "./availableImages";

function CourseImageSelector() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <DLBox>
      <DLTypography varinat="h2">Select Course Image</DLTypography>
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
    </DLBox>
  );
}

export default CourseImageSelector;
