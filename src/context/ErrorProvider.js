/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from "react";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  return <ErrorContext.Provider value={{ error, setError }}>{children}</ErrorContext.Provider>;
}

export default ErrorContext;
