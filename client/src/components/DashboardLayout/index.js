import React, {  useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import NavBar from "./DashboardView/Navbar";
import MainDashboard from "./DashboardView";
import { useAuthState } from "../../context/AuthContext";
import { getUser } from "../../actions/authActions";


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
    height: "100%",
  
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { userType, userID, token,userCoins } = useAuthState();
  const [details, setDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    setLoading(true);
    if (userType === "student") {
   
      getUser({ id: userID, token, userType }).then((fetchedStudents) => {
        console.log(fetchedStudents);
        const details = [
          fetchedStudents.data["name"],
          fetchedStudents.data["studentID"],
          fetchedStudents.data["email"],
          fetchedStudents.data["department"],
          fetchedStudents.data["degree"],
          fetchedStudents.data["year"],
          fetchedStudents.data["coins"],
        ];
        console.log(details);
        setDetailsList(fetchedStudents.data);
        setLoading(false);
      });
    
    }
  }, [token, userID, userType]);

  return (
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
