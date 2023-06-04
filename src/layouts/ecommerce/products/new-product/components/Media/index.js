/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

import { useMemo } from "react";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLDropzone from "components/DLDropzone";

function Media() {
  return (
    <DLBox>
      <DLTypography variant="h5">Media</DLTypography>
      <DLBox mt={3}>
        <DLBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
          <DLTypography component="label" variant="button" fontWeight="regular" color="text">
            Product Image
          </DLTypography>
        </DLBox>
        {useMemo(
          () => (
            <DLDropzone options={{ addRemoveLinks: true }} />
          ),
          []
        )}
      </DLBox>
    </DLBox>
  );
}

export default Media;
