import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Total from "./Total";
import UserDetails from "./UserDetails";
import { useAuthState } from "../../../context/AuthContext";
import { getStudentRank } from "../../../actions/applicationActions";
import Spinner from "../../Spinner";

const MainDashboard = ({ detailList }) => {
  const [rank, setRank] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { userType, userID, token } = useAuthState();

  useEffect(() => {
    setIsLoading(true);
    getStudentRank({ id: userID, token }).then((res) => {
      if (!res.error) {
        setRank(res.data);
      }
      setIsLoading(false);
    });
    return () => setIsLoading(false);
  }, [token, userID, userType]);

  return isLoading ? (
    <Spinner />
  ) : (
    <Grid container spacing={3}>
      <Grid item lg={8} md={12} xl={9} xs={12}>
        <UserDetails detailList={detailList} />
      </Grid>
      <Grid item lg={4} sm={6} xl={3} xs={12} container spacing={3}>
        <Grid item xs={12}>
          <Total counter={rank} cardTitle="Your Rank in Institute" />
          <Grid item xs={12}>
            <Total
              counter={detailList.coinsAchieved}
              cardTitle="Coins Achieved"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainDashboard;
