import React from "react";
import { Redirect } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const ProtectedRoute = (props) => {
  const { isAuthenticated, userType } = useAuthState();
  const Component = props.component;

  return isAuthenticated && userType === props.userType ? (
    <Component />
  ) : (
    <Redirect to={{ pathname: `/${props.userType}/login` }} />
  );
};

export default ProtectedRoute;
