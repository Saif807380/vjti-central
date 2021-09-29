import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid, Paper, Typography, Divider } from "@material-ui/core";
import constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    paddingTop: theme.spacing(3)
  },
  item: {
    marginBottom: theme.spacing(1),
    textAlign: "center"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3)
  },
  point: {
    marginBottom: theme.spacing(1.2),
    fontSize: "1.1rem",
    fontStyle: "italic"
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.item}>
          <Typography variant="h4">VJTI CENTRAL</Typography>
          <Divider style={{ marginBottom: "16px" }} />
          <Typography>
            <strong>VJTI Central</strong> is platform where students can
            showcase their academic and extracurricular achievements to earn{" "}
            <strong>VJ Coins</strong>. If you won a Hackathon, a Coding
            Competiton, Published a Research Paper or Served as a Leader of a
            College Community, then you can submit an application to receive VJ
            Coins. All applications are <strong>verified</strong> by a faculty
            chosen by the student who is applying.
            <br />
            <br />
            VJTI Central leverages the <strong>VJTI Blockchain</strong> for coin
            transactions and provides a Blockchain based solution for rewarding
            extracurricular achievements.
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Grid container spacing={3} justifyContent="space-around">
            <Grid item xs={12} md={5} className={classes.item}>
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  For Students
                </Typography>
                <ul style={{ textAlign: "left" }}>
                  {constants.STEPS.STUDENTS.map((point, index) => (
                    <li key={index} className={classes.point}>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5} className={classes.item}>
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  For Faculty
                </Typography>
                <ul style={{ textAlign: "left" }}>
                  {constants.STEPS.FACULTY.map((point, index) => (
                    <li key={index} className={classes.point}>
                      <p>{point}</p>
                    </li>
                  ))}
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Landing;
