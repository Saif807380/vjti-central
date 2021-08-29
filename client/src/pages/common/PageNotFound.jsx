import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh"
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const PageNotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  const navigateToHome = () => {
    history.push("/");
  };

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h5">Sorry! We could not find this page.</Typography>
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.button}
        onClick={navigateToHome}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default PageNotFound;
