import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";

const Student = () => {
  return (
    <Switch>
      <Route path="/student/login" component={Login} />
      <Route path="/student/register" component={Register} />
      <Route exact path="/student" component={Dashboard} />
    </Switch>
  );
};

export default Student;
