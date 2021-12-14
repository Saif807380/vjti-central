import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  CardHeader,
  Divider
} from "@material-ui/core";
import { FaTrophy } from "react-icons/fa";
import Spinner from "../../Spinner";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 56,
    width: 56
  }
}));

const Total = ({
  className,
  cardTitle,
  Icon,
  counter,
  ...rest
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);



  return (
    <Card style={{ marginTop: '20px' }}>
      <CardHeader title={`${cardTitle}`} />
      <Divider />
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <Grid container justify="space-between" spacing={3}>
            <Grid item xs={6}>
              <Avatar className={classes.avatar}>
                <FaTrophy></FaTrophy>

              </Avatar>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="h3">
                {counter}
              </Typography>
            </Grid>
          </Grid>
        )}
      </CardContent>

    </Card>
  );
};

Total.propTypes = {
  className: PropTypes.string,
  cardTitle: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired
};

export default Total;
