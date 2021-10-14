import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Paper,
  useMediaQuery
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { getApplicationDetails } from "../../actions/applicationActions";
import { useAuthState } from "../../context/AuthContext";
import Spinner from "../Spinner";
import ApplicationItem from "./ApplicationItem";
import StatusChip from "./StatusChip";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
    padding: "20px"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100%",
    width: "100%",
    padding: theme.spacing(3)
  },
  grid: {
    minHeight: "70vh",
    marginTop: theme.spacing(2)
  },
  separator: {
    borderRightStyle: "solid",
    borderWidth: "1px",
    borderColor: "#D3D3D3"
  },
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
  }
}));

const ApplicationDetail = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { token } = useAuthState();
  const Actions = props.actions;

  const [applicationData, setApplicationData] = useState({
    _id: "",
    studentID: "",
    facultyID: "",
    title: "",
    description: "",
    organisedBy: "",
    startDate: "",
    endDate: "",
    doi: "",
    reward: 0,
    status: "",
    domainAchievement: "",
    links: [],
    files: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApplicationDetails({ id, token }).then((res) => {
      if (res.error) {
        setLoading(false);
      } else {
        setApplicationData(res.data);
        setLoading(false);
      }
    });
  }, [history, id, token]);

  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
    >
      <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
        <Typography variant="h6">
          {"Application Details".toLocaleUpperCase()}
        </Typography>
        <Grid
          container
          spacing={isSmallScreen ? 0 : 3}
          className={classes.grid}
        >
          <Grid
            item
            xs={12}
            md={6}
            className={!isSmallScreen ? classes.separator : ""}
            style={{ paddingRight: "30px" }}
          >
            <ApplicationItem
              label="Application ID"
              value={applicationData._id}
            />

            <ApplicationItem
              label="Student Name"
              value={applicationData.studentID.name}
            />

            <ApplicationItem
              label="Faculty Name"
              value={applicationData.facultyID.name}
            />

            <ApplicationItem
              label="Domain of Achievement"
              value={applicationData.domainAchievement}
            />
            <Box className={classes.item}>
              <Typography variant="body1" className={classes.label}>
                Status
              </Typography>
              <Divider variant="fullWidth" className={classes.divider} />
              <StatusChip status={applicationData.status} />
            </Box>
            <ApplicationItem
              label="Rewards Received"
              value={`${applicationData.reward} VJ Coins`}
            />
            {applicationData.domainAchievement === "Research Paper" ? (
              <>
                <ApplicationItem
                  label="Published By"
                  value={applicationData.organisedBy}
                />
                <ApplicationItem
                  label="Published On"
                  value={applicationData.startDate.split("T")[0]}
                />
                <ApplicationItem
                  label="Publication DOI"
                  value={applicationData.doi}
                />
              </>
            ) : (
              <>
                <ApplicationItem
                  label="Organised By"
                  value={applicationData.organisedBy}
                />
                <ApplicationItem
                  label="Start Date"
                  value={applicationData.startDate.split("T")[0]}
                />
                <ApplicationItem
                  label="End Date"
                  value={applicationData.endDate.split("T")[0]}
                />
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6} style={{ paddingRight: "30px" }}>
            <Box className={classes.item}>
              <Typography variant="h6">{applicationData.title}</Typography>
              <Divider variant="fullWidth" className={classes.divider} />
              <Typography variant="body1">
                {applicationData.description.length > 0
                  ? applicationData.description
                  : "No description provided"}
              </Typography>
            </Box>

            <Box style={{ marginBottom: "30px" }}>
              <ApplicationItem label="Files" value="" />
              {applicationData.files.map((file, index) => (
                <li key={index}>
                  <a href={file} target="_blank" rel="noopener noreferrer">
                    Click to view the certificate
                  </a>
                </li>
              ))}
            </Box>

            <Box style={{ marginBottom: "30px" }}>
              <ApplicationItem label="Links" value="" />
              {applicationData.links.map((link, index) => (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  {link}
                </a>
              ))}
            </Box>
            {applicationData.status === "Pending" && (
              <Actions
                position={isSmallScreen ? "center" : "start"}
                applicationData={applicationData}
                setLoading={setLoading}
                id={applicationData._id}
              />
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ApplicationDetail;
