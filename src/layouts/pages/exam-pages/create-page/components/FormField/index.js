/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Distance Learning React components
import DLInput from "components/DLInput";
import DLBox from "components/DLBox";

function FormField({ label, ...rest }) {
  return (
    <DLBox mb={2}>
      <DLInput {...rest} variant="standard" label={label} fullWidth />
    </DLBox>
  );
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
