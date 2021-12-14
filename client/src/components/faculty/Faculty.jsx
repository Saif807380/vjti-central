import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
// import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import ApplicationDetail from "../applications/ApplicationDetail";
import FacultyActions from "../applications/FacultyActions";
import ApplicationsList from "../applications/ApplicationsList";
import DashboardLayout from "../../components/DashboardLayout/index";
const Faculty = () => {
  return (
    <Switch>
      <Route path="/faculty/login">
        <Login userType="faculty" name="Faculty" />
      </Route>
      <Route path="/faculty/register" component={Register} />
      {/* <ProtectedRoute
        exact
        path="/faculty"
        component={Dashboard}
        userType={"faculty"}
      /> */}
      <ProtectedRoute
        exact
        path="/faculty/profile"
        component={DashboardLayout}
        userType={"faculty"}
      />
      <ProtectedRoute
        exact
        path="/faculty/applications"
        component={ApplicationsList}
        userType={"faculty"}
      />
      <ProtectedRoute
        exact
        path="/faculty/applications/:id"
        component={() => <ApplicationDetail actions={FacultyActions} />}
        userType={"faculty"}
      />
    </Switch>
  );
};

export default Faculty;
