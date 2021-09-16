import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../common/Login";
import Register from "./auth/Register";
import Dashboard from "./Dashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import ApplicationsList from "../applications/ApplicationsList";
import ApplicationDetail from "../applications/ApplicationDetail";
import StudentActions from "../applications/StudentActions";
import CreateApplication from "./CreateApplication";
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
        path="/student/applications"
        component={ApplicationsList}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/createApplication"
        component={CreateApplication}
        userType={"student"}
      />
      <ProtectedRoute
        exact
        path="/student/applications/:id"
        component={() => <ApplicationDetail actions={StudentActions} />}
        userType={"student"}
      />
    </Switch>
  );
};

export default Student;
