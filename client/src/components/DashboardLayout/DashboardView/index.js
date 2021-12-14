import React, { useEffect, useState } from "react";
import {  Grid, makeStyles } from "@material-ui/core";
import Total from "./Total";
import UserDetails from "./UserDetails";
import { useAuthState } from "../../../context/AuthContext";
import { getStudentRank } from "../../../actions/applicationActions";
import Spinner from "../../Spinner"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
   
  }
}))
const MainDashboard = ({ detailList }) => {
  
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(true);
  const { userType, userID, token,userCoins } = useAuthState();
  console.log("=======");
  console.log(userCoins);
var usercoins=userCoins;
  useEffect(() => {
    setLoading(true);
    if (userType === "student") {
      getStudentRank({ id: userID, token }).then((res) => {
console.log("==safgg==")
        console.log(res.data);
        setRank(res.data);
      })
    }
    setLoading(false);
  }, [token, userID, userType]);
  if(usercoins==="undefined")
  usercoins=0;
  return loading ? (
    <Spinner />
  ) :
  (
  
        <Grid container spacing={3}>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <UserDetails detailList={detailList}/>
          </Grid>
          <Grid item lg={4} sm={6} xl={3} xs={12} container spacing={3}>
          <Grid item xs={12}>
              <Total
                
                counter={rank}
              
                cardTitle="Institute Rank"
             
              />
            <Grid item xs={12}>
              <Total
               
                counter={detailList.coinsAchieved}
         
                cardTitle="Coins Achieved"
             
              />
            </Grid>
           
            </Grid>
          </Grid>
        </Grid>
    
 )
  
};

export default MainDashboard;
