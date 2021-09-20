import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Clear, CheckCircle } from "@material-ui/icons";
import axios from "axios";
import { useAuthState } from "../../context/AuthContext";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormField from "../FormField";
const BASE_URL = process.env.REACT_APP_API_URL;

const StudentActions = (props) => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reward, setReward] = useState(0);
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
  console.log("here")
  console.log(props.applicationData.studentID._id);
  console.log(props.applicationData._id);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { userID } = useAuthState();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    clearErrors();
    setIsOpen(false);
  };

  const handleVerify = async () => {
    if (!title) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        title: "Please enter the title"
      }));
      return;
    }
    console.log(title, selectedDate.toLocaleDateString("en-GB"));
    let response = await axios.post(
      BASE_URL + "/applications/verify",
      { "title": title, "date": selectedDate.toLocaleDateString("en-GB"), "domainAchievement": "Competition", "facultyID": userID, "studentID": props.applicationData.studentID._id, "applicationID": props.applicationData._id },
    );
    console.log("submit: Done ", response.data);
    if (response.data.message == "Not Found") {
      setIsVerified(true);
      setVerificationSuccess(true);
    } else {
      setIsVerified(false);
      setVerificationSuccess(false);
    }
    clearErrors();
  };

  const handleApprove = async () => {
    if (reward <= 0) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        reward: "Reward cannot be negative"
      }));
      return;
    }

    console.log(title, selectedDate.toLocaleDateString("en-GB"), reward);

    let response = await axios.post(
      BASE_URL + "/applications/approve",
      { "status": "Accepted", "applicationID": props.applicationData._id },
    );
    handleClose();
  };

  const handleReject = async () => {
    let response = await axios.post(
      BASE_URL + "/applications/approve",
      { "status": "Rejected", "applicationID": props.applicationData._id },
    );
    handleClose();
  };

  return (
    <React.Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle>Approve/Reject Application</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the details to verify that this application is not a
              duplicate.
            </DialogContentText>
            <FormField
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
            />
            <FormField
              label="Coin Reward (VJ Coins)"
              name="reward"
              required={true}
              onChange={(e) => setReward(e.target.value)}
              error={errors.reward}
              value={reward}
              disabled={!verificationSuccess}
            />
            {isVerified &&
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
              ))}
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleVerify}>
              Verify
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={
                isVerified
                  ? {
                    backgroundColor: "#4caf50",
                    color: "white"
                  }
                  : {}
              }
              startIcon={<CheckCircle />}
              disabled={!isVerified}
              onClick={handleApprove}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={
                isVerified ? { backgroundColor: "#f44336", color: "white" } : {}
              }
              startIcon={<Clear />}
              disabled={!isVerified}
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

export default StudentActions;
