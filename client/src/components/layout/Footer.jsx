import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "4vh",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper elevation={0} square className={classes.paper}>
      <Typography variant="body1">
        Copyright © 2021 VJTI Mumbai. All rights reserved.
      </Typography>
    </Paper>
  );
};

export default Footer;
