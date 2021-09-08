import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import ApplicationsList from "../applications/ApplicationList";
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
      <ProtectedRoute
        exact
        path="/applications"
        component={ApplicationsList}
        userType={"student"}
      />
    </Switch>
  );
};

export default Student;
