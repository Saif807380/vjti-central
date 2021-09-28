import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Profile from "./profile/Profile";

const useStyles = makeStyles((theme) => ({
  root: {
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
    height: "1100px"
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto"
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={classes.root}
      style={{
        display: "flex",
        justifyContent: "normal",
        alignItems: "normal"
      }}
    >
      <Profile
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
    </div>
  );
};

export default DashboardLayout;
