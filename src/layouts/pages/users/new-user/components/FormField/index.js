/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// formik components
import { ErrorMessage, Field } from "formik";

// Distance Learning React components
import DLBox from "components/DLBox";
import DLTypography from "components/DLTypography";
import DLInput from "components/DLInput";

function FormField({ label, name, ...rest }) {
  return (
    <DLBox mb={1.5}>
      <Field {...rest} name={name} as={DLInput} variant="standard" label={label} fullWidth />
      <DLBox mt={0.75}>
        <DLTypography component="div" variant="caption" color="error" fontWeight="regular">
          <ErrorMessage name={name} />
        </DLTypography>
      </DLBox>
    </DLBox>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default FormField;
