import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Common Pages
const LazyLanding = lazy(() => import("./pages/common/Landing"));
const LazyPageNotFound = lazy(() => import("./pages/common/PageNotFound"));

// Student Pages
const LazyStudent = lazy(() => import("./pages/student/Student"));

// Faculty Pages
const LazyFaculty = lazy(() => import("./pages/faculty/Faculty"));

const App = () => {
  return (
    <BrowserRouter>
      <Box
        display="flex"
        flexDirection="column"
        className="App"
        style={{
          position: "relative",
          minHeight: "100vh"
        }}
      >
        <Box>
          <Header />
        </Box>
        <Box flexGrow={1} style={{ marginBottom: "auto", minHeight: "80vh" }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/* Common routes */}
              <Route exact path="/" component={LazyLanding} />
              {/* Student Routes */}
              <Route path="/student" component={LazyStudent} />
              {/* Faculty Routes */}
              <Route path="/faculty" component={LazyFaculty} />
              {/* not found route should always be last */}
              <Route path="*" component={LazyPageNotFound} />
            </Switch>
          </Suspense>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
