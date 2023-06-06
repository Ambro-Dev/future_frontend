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

function FormField({ label, ...rest }) {
  return <DLInput {...rest} label={label} variant="standard" fullWidth />;
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
