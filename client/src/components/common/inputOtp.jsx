import { React, useState, useContext } from "react";
import {
  Typography,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OtpInput from "react-otp-input";
import { register } from "../../actions/authActions";
import { useAuthDispatch } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { SnackbarContext } from "../../context/SnackbarContext";
import "./otpcss/inputOtp.css";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "40%"
    }
  },
  form: {
    width: "100%",
    justifyContent: "center"
  },
  formInner: {
    padding: "20px 30px"
  },
  formControl: {
    marginBottom: "20px",
    width: "100%"
  },
  key: {
    backgroundColor: "#D6D6D6",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const OtpPage = (props) => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const [otp, setOtp] = useState("");
  const [keys, setKeys] = useState({
    publicKey: "",
    privateKey: ""
  });


  const handleClick = () => {
    if (otp.length === 6) {
      if (props.type === "Register") {
        register({
          dispatch,
          body: { ...props.values, otp: otp },
          userType: "student"
        }).then((res) => {
          if (res.error) {
            setSeverity("error");
            setMessage(res.error);
            setOpen(true);
          } else {

            history.push(`/student/applications`);
            setSeverity("success");
            setMessage("You have successfully registered.");
            setOpen(true);
          }
        });
      }
    } else {
      setSeverity("error");
      setMessage("Please input full otp");
      setOpen(true);
    }
  };

  return (
    <>

      <section id="otpSection">
        <div className="center_div">
          <h2>Let's confirm your identity</h2>
          <Typography variant="h6" className="addMarginOnTop">
            Check your email for the OTP and enter below to proceed
          </Typography>

          <OtpInput
            className="otpInput"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>&nbsp; - &nbsp;</span>}
          />

          <Button
            size="large"
            color="primary"
            type="submit"
            variant="contained"
            onClick={handleClick}
          >
            {" "}
            Verify OTP{" "}
          </Button>
        </div>
      </section>
    </>
  );
};

export default OtpPage;
