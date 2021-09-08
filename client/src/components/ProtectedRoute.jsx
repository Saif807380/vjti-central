import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../context/AuthContext";

const ProtectedRoute = ({ userType: type, component: Component, ...rest }) => {
  const { isAuthenticated, userType } = useAuthState();

  return isAuthenticated && userType === type ? (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  ) : (
    <Redirect to={{ pathname: `/${userType}/login` }} />
  );
};

export default ProtectedRoute;
