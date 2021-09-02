import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";

const Faculty = () => {
  return (
    <Switch>
      <Route path="/faculty/login">
        <Login userType="faculty" name="Faculty" />
      </Route>
      <Route path="/faculty/register" component={Register} />
      <ProtectedRoute
        exact
        path="/faculty"
        component={Dashboard}
        userType={"faculty"}
      />
    </Switch>
  );
};

export default Faculty;
