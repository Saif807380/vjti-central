import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListSubheader
} from "@material-ui/core";
import { Clear, CheckCircle } from "@material-ui/icons";
import { useAuthState } from "../../context/AuthContext";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormField from "../FormField";
import {
  approveApplication,
  rejectApplication,
  verifyApplication
} from "../../actions/applicationActions";
import { SnackbarContext } from "../../context/SnackbarContext";
import constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "20px",
    width: "100%"
  }
}));

const FacultyActions = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reward, setReward] = useState("");
  const [errors, updateErrors] = useState({
    title: "",
    date: "",
    reward: ""
  });
  const clearErrors = () => {
    updateErrors({
      title: "",
      reward: ""
    });
  };
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { token } = useAuthState();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    clearErrors();
    setIsOpen(false);
  };

  // const handleVerify = async () => {
  //   if (!title) {
  //     updateErrors((prevErrors) => ({
  //       ...prevErrors,
  //       title: "Please enter the title",
  //     }));
  //     return;
  //   }

  //   const body = {
  //     title: title,
  //     date: selectedDate.toLocaleDateString("en-GB"),
  //     studentID: props.applicationData.studentID._id,
  //   };

  //   verifyApplication({ body, token }).then((res) => {
  //     if (res.error) {
  //       return;
  //     } else {
  //       setIsVerified(true);
  //       if (res.data.message === "Verification Successful")
  //         setVerificationSuccess(true);
  //       else setVerificationSuccess(false);
  //     }
  //   });
  //   clearErrors();
  // };

  const handleApprove = async () => {
    if (+reward <= 0) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        reward: "Reward cannot be negative"
      }));
      return;
    }
    handleClose();
    props.setLoading(true);
    approveApplication({
      id: props.applicationData._id,
      token,
      title,
      reward: +reward,
      date: selectedDate.toLocaleDateString("en-GB")
    }).then((res) => {
      if (res.error) {
        setSeverity("error");
        setMessage(res.error);
        setOpen(true);
        return;
      } else {
        history.replace(`/faculty/applications/${props.applicationData._id}`);
        setSeverity("success");
        setMessage("Application approved. Reward will be mined shortly.");
        setOpen(true);
      }
      props.setLoading(false);
    });
  };

  const handleReject = async () => {
    rejectApplication({ id: props.applicationData._id, token }).then((res) => {
      if (res.error) return;
      else {
        history.replace(`/faculty/applications/${props.applicationData._id}`);
      }
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Approve/Reject Application</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a reward from below if you want to approve the
              application.
            </DialogContentText>
            {/* <FormField
              label="Achievement Title"
              name="title"
              required={true}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
            />
            <KeyboardDatePicker
              disableFuture
              inputVariant="outlined"
              label="Date of Achievement"
              value={selectedDate}
              placeholder={new Date().toLocaleDateString("en-GB")}
              onChange={(date) => setSelectedDate(date)}
              format="dd/MM/yyyy"
              style={{ width: "100%" }}
            /> */}
            <>
              {props.applicationData.domainAchievement !== "Other" ? (
                <FormControl
                  variant="outlined"
                  required
                  className={classes.formControl}
                  error={errors.reward.length !== 0}
                >
                  <InputLabel id="reward-label">
                    Coin Reward (VJ Coins)
                  </InputLabel>
                  <>
                    {
                      {
                        Hackathon: (
                          <>
                            <Select
                              labelId="reward-label"
                              id="reward"
                              name="reward"
                              value={reward}
                              onChange={(e) => setReward(e.target.value)}
                              label="Coin Reward (VJ Coins)"
                            >
                              <ListSubheader>Hackathon</ListSubheader>
                              {constants.REWARDS.HACKATHON.map((r, idx) => (
                                <MenuItem key={idx} value={r.VALUE}>
                                  {r.LABEL}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        ),
                        Competition: (
                          <>
                            <Select
                              labelId="reward-label"
                              id="reward"
                              name="reward"
                              value={reward}
                              onChange={(e) => setReward(e.target.value)}
                              label="Coin Reward (VJ Coins)"
                            >
                              <ListSubheader>Coding Competition</ListSubheader>
                              {constants.REWARDS.COMPETITION.map((r, idx) => (
                                <MenuItem key={idx} value={r.VALUE}>
                                  {r.LABEL}
                                </MenuItem>
                              ))}
                            </Select>
                          </>
                        ),
                        "Research Paper": (
                          <>
                            <Select
                              labelId="reward-label"
                              id="reward"
                              name="reward"
                              value={reward}
                              onChange={(e) => setReward(e.target.value)}
                              label="Coin Reward (VJ Coins)"
                            >
                              <ListSubheader>Research Paper</ListSubheader>
                              {constants.REWARDS.RESEARCH_PAPER.map(
                                (r, idx) => (
                                  <MenuItem key={idx} value={r.VALUE}>
                                    {r.LABEL}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </>
                        ),
                        "Committee Position": (
                          <>
                            <Select
                              labelId="reward-label"
                              id="reward"
                              name="reward"
                              value={reward}
                              onChange={(e) => setReward(e.target.value)}
                              label="Coin Reward (VJ Coins)"
                            >
                              <ListSubheader>Committee Position</ListSubheader>
                              {constants.REWARDS.COMMITTEE_POSITION.map(
                                (r, idx) => (
                                  <MenuItem key={idx} value={r.VALUE}>
                                    {r.LABEL}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </>
                        )
                      }[props.applicationData.domainAchievement]
                    }
                  </>
                  <FormHelperText>{errors.reward}</FormHelperText>
                </FormControl>
              ) : (
                <FormField
                  label="Coin Reward (VJ Coins)"
                  name="reward"
                  required={true}
                  onChange={(e) => setReward(e.target.value)}
                  error={errors.reward}
                  value={reward}
                  disabled={!verificationSuccess}
                />
              )}
            </>
            {/* {isVerified &&
              (verificationSuccess ? (
                <DialogContentText>
                  Verification Successful. This application has not been
                  previously rewarded.
                </DialogContentText>
              ) : (
                <DialogContentText>
                  Verification Failed. This application has already been
                  rewarded. Kindly reject this application
                </DialogContentText>
              ))} */}
          </DialogContent>
          <DialogActions>
            {/* <Button variant="contained" color="primary" onClick={handleVerify}>
              Verify
            </Button> */}
            <Button
              variant="contained"
              color="default"
              style={{
                backgroundColor: "#4caf50",
                color: "white"
              }}
              startIcon={<CheckCircle />}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#f44336", color: "white" }}
              startIcon={<Clear />}
              onClick={handleReject}
            >
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      </MuiPickersUtilsProvider>
      <Box display="flex" justifyContent={props.position}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Approve / Reject
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default FacultyActions;
