import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";

const Student = () => {
  return (
    <Switch>
      <Route path="/student/login">
        <Login userType="student" name="Student" />
      </Route>
      <Route path="/student/register" component={Register} />
      <ProtectedRoute
        exact
        path="/student"
        component={Dashboard}
        userType={"student"}
      />
    </Switch>
  );
};

export default Student;
