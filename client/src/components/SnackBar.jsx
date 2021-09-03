import React, { useContext } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { SnackbarContext } from "../context/SnackbarContext";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const SnackBar = () => {
  const { open, handleClose, severity, message } = useContext(SnackbarContext);
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
