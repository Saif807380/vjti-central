import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Box,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from "@material-ui/core";
import {
  AccessTimeOutlined,
  CheckCircle,
  ClearOutlined
} from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import { useAuthState } from "../../context/AuthContext";
import StatusChip from "./StatusChip";
import { getApplications } from "../../actions/applicationActions";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "80vh",
    padding: "20px"
  },
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    width: "100%"
  },
  titleLink: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  root: {
    "&$selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    },
    "&$selected&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white"
    }
  },
  selected: {}
}));

const ApplicationsList = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { userID, token, userType } = useAuthState();
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    getApplications({ id: userID, token, userType }).then((res) => {
      if (res.error) {
        setLoading(false);
      } else {
        setApplications(res.data.applications);
        setLoading(false);
      }
    });
  }, [token, userID, userType]);

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredApplications(applications);
    } else {
      let temp = applications.filter((a) => {
        return a.status === statusFilter;
      });
      setFilteredApplications(temp);
    }
  }, [statusFilter, applications]);

  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.container}
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        style={{ width: "100%", marginBottom: "16px" }}
      >
        <Typography variant="h6">
          {"Applications".toLocaleUpperCase()}
        </Typography>


        <Typography variant="h6">
          {userType == "student" ?
            <Button variant="contained" color="primary">Create Application</Button> : ""}
        </Typography>


        <ToggleButtonGroup
          value={statusFilter}
          exclusive
          size="small"
          onChange={(event, status) => setStatusFilter(status)}
        >
          <ToggleButton
            value="All"
            classes={{ selected: classes.selected, root: classes.root }}
          >
            All
          </ToggleButton>
          <ToggleButton
            value="Pending"
            classes={{ selected: classes.selected, root: classes.root }}
          >
            <AccessTimeOutlined />
          </ToggleButton>
          <ToggleButton
            value="Accepted"
            classes={{ selected: classes.selected, root: classes.root }}
          >
            <CheckCircle />
          </ToggleButton>
          <ToggleButton
            value="Rejected"
            classes={{ selected: classes.selected, root: classes.root }}
          >
            <ClearOutlined />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Divider variant="fullWidth" className={classes.divider} />
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>
                <Typography variant="h6">Title</Typography>
              </TableCell>
              {!isSmallScreen && (
                <TableCell style={{ textAlign: "center" }}>
                  <Typography variant="h6">Domain of Achievement</Typography>
                </TableCell>
              )}
              <TableCell style={{ textAlign: "center" }}>
                <Typography variant="h6">Application Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((application) => (
              <TableRow key={application._id}>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  <Link
                    to={`/${userType}/applications/${application._id}`}
                    className={classes.titleLink}
                  >
                    {application.title}
                  </Link>
                </TableCell>
                {!isSmallScreen && (
                  <TableCell
                    style={{ fontSize: "1.1rem", textAlign: "center" }}
                  >
                    {application.domainAchievement}
                  </TableCell>
                )}
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  <StatusChip status={application.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ApplicationsList;
