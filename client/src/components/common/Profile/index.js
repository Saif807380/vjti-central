import React, { useEffect, useState }  from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Spinner from "../../Spinner";
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
import axios from "axios";
import { useAuthState } from "../../../context/AuthContext";
const BASE_URL = process.env.REACT_APP_API_URL;

const studentDetails = [
    {
        icon: UsersIcon,
        title: "Name"
      },
      {
        icon: UsersIcon,
        title: "ID No"
      },
      {
        icon: Database,
        title: "Email"
      },
      {
        icon:Database,
        title: "Public Key"
      },
  {
    icon: BarChartIcon,
    title: "Deparment"
  },
  {
    icon: BarChartIcon,
    title: "Year"
  },
  {
    icon: BarChartIcon,
    title: "Degree"
  },
  {
    icon: ShoppingBagIcon,
    title: "Wallet Balance"
  },
];

const facultyDetails =  [
    {
        icon: UsersIcon,
        title: "Name"
      },
  
  {
    icon: UsersIcon,
    title: "ID No"
  },
  {
    icon: Database,
    title: "Email"
  },
  {
    icon: BarChartIcon,
    title: "Deparment"
  },
  {
    icon: BarChartIcon,
    title: "Position"
  },
  {
    icon: BarChartIcon,
    title: "Description"
  },
];


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
    backgroundColor: "#f1f1f1"
  },
  desktopDrawer: {
    marginTop:75,
    width: 1400,
    top: 60,
    marginLeft:1,
    maxHeight:400
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    backgroundColor: "black"
  }
}));

export default function Profile({ onMobileClose, openMobile, setContents }){
  const classes = useStyles();
  const {userType,userID } = useAuthState();
  const [detailList, setdetailList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchingDetails = async () => {
  
  if(userType=="student"){
  
  const fetchedStudents = await axios.get(`${BASE_URL}/student/${userID}`,);
  const details=[fetchedStudents.data["name"],fetchedStudents.data["studentID"],fetchedStudents.data["email"],fetchedStudents.data["publicKey"],fetchedStudents.data["department"],fetchedStudents.data["degree"],fetchedStudents.data["year"],fetchedStudents.data["walletBalance"]];
  setdetailList(details);
 
}else{
  const fetchedFaculty = await axios.get(`${BASE_URL}/faculty/${userID}`,);
 
  const details=[fetchedFaculty.data["name"],fetchedFaculty.data["facultyID"],fetchedFaculty.data["email"],fetchedFaculty.data["department"],fetchedFaculty.data["position"],fetchedFaculty.data["description"]];
  setdetailList(details);
}
} 

useEffect(() => {
    setLoading(true);
    fetchingDetails().then((res) => {
      setLoading(false);
    });
    
}, []);

 
  return (
    loading ? (
      <Spinner />
    ) : (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="center"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
            <Box height="50%" width="100%" display="flex" >
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={User} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
        { detailList[0]}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
        {userType=="student"?
          studentDetails.map((detail, idx) => (
            <ProfileItem
              key={detail.title}
              title={detail.title}
              value={detailList[idx]}
              icon={detail.icon}
              index={idx}
              setContents={setContents}
            />
          )): facultyDetails.map((detail, idx) => (
            <ProfileItem
              key={detail.title}
              title={detail.title}
              value={detailList[idx]}
              icon={detail.icon}
              index={idx}
              setContents={setContents}
            />
          ))
}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="center"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
            <Box height="50%" width="100%" display="flex" >
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={User} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
        { detailList[0]}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
        {userType=="student"?
          studentDetails.map((detail, idx) => (
            <ProfileItem
              key={detail.title}
              title={detail.title}
              value={detailList[idx]}
              icon={detail.icon}
              index={idx}
              setContents={setContents}
            />
          )): facultyDetails.map((detail, idx) => (
            <ProfileItem
              key={detail.title}
              title={detail.title}
              value={detailList[idx]}
              icon={detail.icon}
              index={idx}
              setContents={setContents}
            />
          ))
}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
        </Drawer>
      </Hidden>
    </>
    )
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

