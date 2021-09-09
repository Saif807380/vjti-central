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
import FormField from "../FormField";

const StudentActions = (props) => {
  const [title, setTitle] = useState("");
  const [reward, setReward] = useState(0);
  const [errors, updateErrors] = useState({
    title: "",
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

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    clearErrors();
    setIsOpen(false);
  };

  const handleVerify = () => {
    if (!title) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        title: "Please enter the title"
      }));
      return;
    }
    console.log(title);
    setIsVerified(true);
    setVerificationSuccess(true);
    clearErrors();
  };

  const handleApprove = () => {
    if (reward <= 0) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        reward: "Reward cannot be negative"
      }));
      return;
    }
    console.log(title, reward);
    handleClose();
  };

  const handleReject = () => {
    handleClose();
  };

  return (
    <React.Fragment>
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
          <FormField
            label="Coin Reward (VJ Coins)"
            name="reward"
            required={true}
            onChange={(e) => setReward(e.target.value)}
            error={errors.reward}
            value={reward}
          />
          {isVerified &&
            (verificationSuccess ? (
              <DialogContentText>
                Verification Successful. This application has not been
                previously rewarded.
              </DialogContentText>
            ) : (
              <DialogContentText>
                Verification Failed. This application has already been rewarded.
                Kindly reject this application
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
      <Box display="flex" justifyContent={props.position}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Approve / Reject
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default StudentActions;