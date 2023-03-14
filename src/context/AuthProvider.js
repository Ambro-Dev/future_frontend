import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  const authValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
