import React, { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon,
  HelpCircle as HelpCircleIcon,
  User,
  Database
} from "react-feather";
import ProfileItem from "./ProfileItem";


const details = [
    {
        icon: BarChartIcon,
        title: "Name : Computer Engineering"
      },
  {
    icon: BarChartIcon,
    title: "Deparment : Computer Engineering"
  },
  {
    icon: UsersIcon,
    title: "ID No : 181071035"
  },
  {
    icon: ShoppingBagIcon,
    title: "Public Key : 111111111111111111111111111111111111111111111111"
  },
  {
    icon: Database,
    title: "Email : mantrypalak@gmail.com"
  },
  {
    icon: BarChartIcon,
    title: "Deparment : Computer Engineering"
  },
  {
    icon: BarChartIcon,
    title: "Degree : Computer Engineering"
  },
  {
    icon: BarChartIcon,
    title: "Admission Year : Computer Engineering"
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: "#f1f1f1"
  },
  desktopDrawer: {
    marginTop:75,
    width: 850,
    top: 60,
    marginLeft:200,
    maxHeight:400
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    backgroundColor: "black"
  }
}));

const Profile = ({ onMobileClose, openMobile, setContents }) => {
  const classes = useStyles();

  const content = (
    <Box height="50%" width="100%" display="flex" >
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={User} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          Palak Mantry
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {details.map((detail, idx) => (
            <ProfileItem
              key={detail.title}
              title={detail.title}
              icon={detail.icon}
              index={idx}
              setContents={setContents}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="center"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="center"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Profile.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  setContents: PropTypes.func
};

Profile.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default Profile;
