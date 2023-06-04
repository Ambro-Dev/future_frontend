/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useEffect, useRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Dropzone components
import Dropzone from "dropzone";

// Dropzone styles
import "dropzone/dist/dropzone.css";

// Distance Learning React components
import DLBox from "components/DLBox";

// Custom styles for the DLDropzone
import DLDropzoneRoot from "components/DLDropzone/DLDropzoneRoot";

// Distance Learning React context
import { useMaterialUIController } from "context";

function DLDropzone({ options }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const dropzoneRef = useRef();

  useEffect(() => {
    Dropzone.autoDiscover = false;

    function createDropzone() {
      return new Dropzone(dropzoneRef.current, { ...options });
    }

    function removeDropzone() {
      if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
    }

    createDropzone();

    return () => removeDropzone();
  }, [options]);

  return (
    <DLDropzoneRoot
      component="form"
      action="/file-upload"
      ref={dropzoneRef}
      className="form-control dropzone"
      ownerState={{ darkMode }}
    >
      <DLBox className="fallback" bgColor="transparent">
        <DLBox component="input" name="file" type="file" multiple />
      </DLBox>
    </DLDropzoneRoot>
  );
}

// Typechecking props for the DLDropzone
DLDropzone.propTypes = {
  options: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DLDropzone;
