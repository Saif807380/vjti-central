import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "./DashboardView/Navbar";
import MainDashboard from "./DashboardView";
import { useAuthState } from "../../context/AuthContext";
import { getUser } from "../../actions/authActions";
import Spinner from "../Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%"
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    height: "500px"
  },
  content: {
    flex: "1 1 auto",
    height: "100%"
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { userType, userID, token } = useAuthState();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
   
      getUser({ id: userID, token, userType }).then((fetchedStudents) => {
        setDetails(fetchedStudents.data);
        setLoading(false);
      });
 
  }, [token, userID, userType]);

  return loading ? (
    <Spinner />
  ) : (
    <div className={classes.root}>
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        detailList={details}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <MainDashboard detailList={details} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
