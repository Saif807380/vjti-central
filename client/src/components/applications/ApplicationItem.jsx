import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: theme.spacing(2)
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    marginBottom: theme.spacing(1)
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "500"
  },
  value: {
    fontSize: "1.15rem"
  }
}));

const ApplicationItem = (props) => {
  const classes = useStyles();
  const { label, value } = props;
  return (
    <Box className={classes.item}>
      <Typography variant="body1" className={classes.label}>
        {label}
      </Typography>
      <Divider variant="fullWidth" className={classes.divider} />
      <Typography variant="body1" className={classes.value}>
        <em>{value}</em>
      </Typography>
    </Box>
  );
};

export default ApplicationItem;
