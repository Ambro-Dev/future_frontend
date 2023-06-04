/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-flatpickr components
import Flatpickr from "react-flatpickr";

// react-flatpickr styles
import "flatpickr/dist/flatpickr.css";

// Distance Learning React components
import DLInput from "components/DLInput";

function DLDatePicker({ input, ...rest }) {
  return (
    <Flatpickr
      {...rest}
      render={({ defaultValue }, ref) => (
        <DLInput {...input} defaultValue={defaultValue} inputRef={ref} />
      )}
    />
  );
}

// Setting default values for the props of DLDatePicker
DLDatePicker.defaultProps = {
  input: {},
};

// Typechecking props for the DLDatePicker
DLDatePicker.propTypes = {
  input: PropTypes.objectOf(PropTypes.any),
};

export default DLDatePicker;
