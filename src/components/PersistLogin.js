/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ErrorContext from "context/ErrorProvider";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import MDTypography from "./MDTypography";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  const { showErrorNotification } = useContext(ErrorContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        if (err.response.status === 406) showErrorNotification("You have been logged out");
        else showErrorNotification(err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <MDTypography>Loading...</MDTypography> : <Outlet />}</>
  );
}

export default PersistLogin;
