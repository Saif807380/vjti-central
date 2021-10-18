import { React, useEffect, useState, useContext } from "react";
import { Card, Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import OtpInput from "react-otp-input";
import { register } from "../../actions/authActions";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
//import Otp from "../../assets/images/OtpImages/otp.svg";
import { SnackbarContext } from "../../context/SnackbarContext";
import "./otpcss/inputOtp.css";

const OtpPage = (props) => {
    const [error, setError] = useState("");
    const dispatch = useAuthDispatch();
    const history = useHistory();
    const { loading, errorMessage } = useAuthState();
    // const [
    //     open,
    //     setOpen,
    //     handleClose,
    //     severity,
    //     setSeverity,
    //     message,
    //     setMessage
    // ] = useContext(SnackbarContext);
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
                        // setSeverity("error");
                        // setMessage(res.error);
                        // setOpen(true);
                    } else {
                        if (res.data.data.keys.privateKey) {
                            setKeys(res.data.data.keys);
                            setIsRegistered(true);
                        } else {
                            history.push("/student/login");
                        }
                        // setSeverity("success");
                        // setMessage("You have successfully registered.");
                        // setOpen(true);
                    }
                });
            }
        } else {
            // setSeverity("error");
            // setMessage("Please input full otp");
            // setOpen(true);
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
                    <h1>Hellp</h1>
                    <Button onClick={handleClick} text="Verify OTP" />
                    <small style={{ color: "red" }}>{error}</small>
                </div>
            </section>
        </>
    );
};

export default OtpPage;