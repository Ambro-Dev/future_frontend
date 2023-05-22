/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-return-assign */
/* eslint-disable no-unused-expressions */
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ErrorContext from "context/ErrorProvider";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  const { setError } = useContext(ErrorContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
