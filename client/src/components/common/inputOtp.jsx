import { React, useState, useContext } from "react";
import {
    Typography, Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OtpInput from "react-otp-input";
import { register } from "../../actions/authActions";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
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
    const [error, setError] = useState("");
    const dispatch = useAuthDispatch();
    const history = useHistory();
    const { loading, errorMessage } = useAuthState();
    const {

        setOpen,
        setSeverity,
        setMessage
    } = useContext(SnackbarContext);
    const [otp, setOtp] = useState("");
    const [keys, setKeys] = useState({
        publicKey: "",
        privateKey: ""
    });
    const [hasPubKey, setHasPubKey] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const handleClick = () => {
        if (otp.length === 6) {
            if (props.type === "Register") {
                console.log(otp);
                console.log(props);
                register({ dispatch, data: { ...props.values, otp: otp }, userType: "student" }).then((res) => {
                    if (res.error) {
                        setSeverity("error");
                        setMessage(res.error);
                        setOpen(true);
                    } else {
                        setIsRegistered(true);
                        if (res.data.data.keys.privateKey) {
                            setKeys(res.data.data.keys);
                            setIsRegistered(true);
                            console.log(isRegistered);
                        } else {
                            setIsRegistered(true);

                        }
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

            <Dialog open={isRegistered}>
                <DialogTitle>Key Pair</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Here's the public key that was generated for you. You can download
                        your encrypted credentials file from your profile. This file can be
                        imported into the VJTI-Blockchain Wallet App. We store your Public
                        key in our database for sending your rewards to you.
                    </DialogContentText>
                    <Typography variant="body1">Public Key</Typography>
                    {/* <Paper elevation={0} className={classes.key} square>
                        <Typography variant="body2" style={{ wordWrap: "break-word" }}>
                            {keys.publicKey}
                        </Typography>
                    </Paper> */}

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            history.push(`/student/login`);
                        }}
                    >
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>

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

                    <Button size="large"
                        color="primary"
                        type="submit"

                        variant="contained" onClick={handleClick}> Verify OTP </Button>
                    <small style={{ color: "red" }}>{error}</small>
                </div>
            </section>
        </>
    );
};

export default OtpPage;