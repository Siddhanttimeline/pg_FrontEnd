import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

const useSessionAuth = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      const isLoggedInValue = sessionStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedInValue); // Set isLoggedIn state
      if (isLoggedInValue) {
        dispatch(authActions.login());
      } else {
        dispatch(authActions.logout());
      }
    };

    checkSession();

    // Clean-up function to prevent memory leaks
    return () => {};
  }, [dispatch]);

  return isLoggedIn; // Return isLoggedIn status
};

export default useSessionAuth;
