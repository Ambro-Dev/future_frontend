import MDSnackbar from "components/MDSnackbar";
import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const [errorSB, setErrorSB] = useState(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const showErrorNotification = (errorMessage) => {
    setError(errorMessage);
    openErrorSB();
    setTimeout(() => {
      setErrorSB(false);
      setError(null);
    }, 10000); // 10 seconds
  };

  const errorContextValue = useMemo(() => ({ showErrorNotification }), []);

  return (
    <ErrorContext.Provider value={errorContextValue}>
      {children}
      {errorSB && (
        <MDSnackbar
          color="error"
          icon="warning"
          title="Time out"
          content={error}
          dateTime=""
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgWhite
        />
      )}
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorContext;
