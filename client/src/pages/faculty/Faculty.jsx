import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";

const Faculty = () => {
  return (
    <Switch>
      <Route path="/faculty/login" component={Login} />
      <Route path="/faculty/register" component={Register} />
      <Route exact path="/faculty" component={Dashboard} />
    </Switch>
  );
};

export default Faculty;
