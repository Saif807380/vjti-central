import React, { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  FormHelperText,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { SnackbarContext } from "../../../context/SnackbarContext";
import { useAuthDispatch } from "../../../context/AuthContext";
import FormField from "../../../components/FormField";
import constants from "../../../constants";
import { sendOTP } from "../../../actions/authActions";
import { REQUEST_AUTH } from "../../../reducers/types";
import OtpPage from "../../common/inputOtp";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh",
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

let currentYear = new Date().getFullYear();

const Register = () => {
  const classes = useStyles();
  const dispatch = useAuthDispatch();
  const theme = useTheme();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState(null);
  const [student, setStudent] = useState({
    studentID: "",
    name: "",
    email: "",
    password: "",
    department: "",
    degree: "",
    admissionYear: "",
    publicKey: localStorage.getItem("pubkey")
  });

  const [errors, updateErrors] = useState({
    studentID: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    degree: "",
    admissionYear: ""
  });

  const branchMap = {
    BTech: constants.BTECH,
    MTech: constants.MTECH,
    MCA: constants.MCA,
    Diploma: constants.DIPLOMA
  };

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [isRegistered, setIsRegistered] = useState(true);
  const handleStudent = (e) => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = () => {
    let formIsValid = true;
    updateErrors({
      studentID: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      degree: "",
      admissionYear: ""
    });
    if (student.studentID.length !== 9) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        studentID: "* Please enter a valid student ID"
      }));
      formIsValid = false;
    }
    if (!student.name) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        name: "* Please enter your name"
      }));
      formIsValid = false;
    }
    if (!student.email) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: "* Email can't be Empty"
      }));
    } else if (!student.email.includes(".vjti.ac.in")) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: "* Please use VJTI Email ID only"
      }));
    }
    /* if (student.password.length < 8) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        password: "* Password too short"
      }));
    }
    if (student.password !== confirmPassword) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "* Password and Confirm Password do not match"
      }));
    }*/
    if (!student.department) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        department: "* Please enter your department"
      }));
      formIsValid = false;
    }
    if (!student.degree) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        degree: "* Please enter your degree"
      }));
      formIsValid = false;
    }
    if (student.admissionYear.length < 4) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        admissionYear: "* Please enter a valid admission year"
      }));
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    dispatch({ type: REQUEST_AUTH });
    event.preventDefault();
    if (isFormValid()) {
      sendOTP({ dispatch, email: student.email, type: "Register" }).then(
        (res) => {
          if (res.status === 200) {
            setFormData({
              student,
              hash: res.data.hash
            });
          } else {
            setSeverity("error");
            setMessage(res.error);
            setOpen(true);
          }
        }
      );
    }
  };
  return formData ? (
    <OtpPage type="Register" values={formData} />
  ) : (
    <>
      <Dialog open={isRegistered}>
        <DialogTitle>Key Pair</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here's the public key that was generated for you through the VJChain
            Wallet. You can download your credentials file from your profile
            after you complete the regitration process. We store your Public key
            in our database for sending your rewards to you.
          </DialogContentText>
          <Typography variant="body1">Public Key</Typography>
          <Paper elevation={0} className={classes.key} square>
            <Typography variant="body2" style={{ wordWrap: "break-word" }}>
              {student.publicKey}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsRegistered(false);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      <React.Fragment>
        <Box
          className={classes.root}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
            <div style={{ marginTop: "24px" }}>
              <Typography variant="h5">Student Registration</Typography>
            </div>
            {/* <div
              style={{ padding: "24px", width: "100%", wordWrap: "break-word" }}
            >
              <Typography variant="h6">
                Generated Public Key: {student.publicKey}{" "}
              </Typography>
            </div>
            <div style={{ marginTop: "24px" }}>
              <Typography variant="h6">
                Please fill in the other details to complete the process
              </Typography>
            </div> */}

            <form className={classes.form} noValidate>
              <div className={classes.formInner}>
                <FormField
                  label="Student ID"
                  name="studentID"
                  required={true}
                  onChange={handleStudent}
                  error={errors.studentID}
                />
                <FormField
                  label="Student Name"
                  name="name"
                  required={true}
                  onChange={handleStudent}
                  error={errors.name}
                />
                <FormField
                  label="Email"
                  name="email"
                  required={true}
                  onChange={handleStudent}
                  error={errors.email}
                />
                {/*<FormField
                  label="Password"
                  name="password"
                  required={true}
                  onChange={handleStudent}
                  error={errors.password}
                  InputProps={{
                    type: showPassword ? "text" : "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  required={true}
                  onChange={handleConfirmPassword}
                  error={errors.confirmPassword}
                  InputProps={{
                    type: showConfirmPassword ? "text" : "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />*/}
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="outlined"
                      required
                      className={classes.formControl}
                      error={errors.degree.length !== 0}
                    >
                      <InputLabel id="degree-label">Degree</InputLabel>
                      <Select
                        labelId="degree-label"
                        id="degree"
                        name="degree"
                        value={student.degree}
                        onChange={handleStudent}
                        label="Degree"
                      >
                        {constants.DEGREE.map((degree) => (
                          <MenuItem key={degree} value={degree}>
                            {degree}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.degree}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl
                      variant="outlined"
                      required
                      className={classes.formControl}
                      error={errors.admissionYear.length !== 0}
                    >
                      <InputLabel id="admission-year-label">
                        Admission Year
                      </InputLabel>
                      <Select
                        labelId="admission-year-label"
                        id="admission-year"
                        name="admissionYear"
                        value={student.admissionYear}
                        onChange={handleStudent}
                        label="Admission Year"
                      >
                        {[...Array(20).keys()].map((number) => (
                          <MenuItem
                            key={number}
                            value={`${currentYear - number}`}
                          >
                            {currentYear - number}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>{errors.admissionYear}</FormHelperText>
                    </FormControl>
                  </Grid>
                  {student.degree && (
                    <>
                      <FormControl
                        variant="outlined"
                        required
                        className={classes.formControl}
                        error={errors.department.length !== 0}
                      >
                        <InputLabel id="department-label">Branch</InputLabel>
                        <Select
                          labelId="department-label"
                          id="department"
                          name="department"
                          value={student.department}
                          onChange={handleStudent}
                          label="Branch"
                        >
                          {branchMap[student.degree].map((branch) => (
                            <MenuItem key={branch} value={branch}>
                              {branch}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{errors.department}</FormHelperText>
                      </FormControl>
                    </>
                  )}
                </Grid>

                {/* <FormControlLabel
                style={{ marginBottom: "10px", color: "#757575" }}
                control={
                  <Checkbox
                    value="hasPubKey"
                    color="primary"
                    checked={hasPubKey}
                    onChange={handleHasPubKey}
                  />
                }
                label="Do you have a public key? (If you don't, enter a pin and passphrase below to generate a new public key-pair for yourself)"
              />
              {!hasPubKey && (
                <React.Fragment>
                  <FormField
                    label="Pin (4-digit number)"
                    name="pin"
                    required={true}
                    onChange={handleStudent}
                    error={errors.pin}
                    InputProps={{
                      type: showPin ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle pin visibility"
                            onClick={toggleShowPin}
                            edge="end"
                          >
                            {showPin ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <FormField
                    label="Encryption Passphrase (12 - 24 characters)"
                    name="passphrase"
                    required={true}
                    onChange={handleStudent}
                    error={errors.passphrase}
                  />
                </React.Fragment>
              )}
              {hasPubKey && (
                <FormField
                  label="Public Key"
                  name="customPublicKey"
                  required={true}
                  onChange={handleStudent}
                  error={errors.customPublicKey}
                  multiline={true}
                  maxRows={Infinity}
                />
              )} */}
                <Button
                  onClick={handleFormSubmit}
                  size="large"
                  color="primary"
                  type="submit"
                  fullWidth
                  variant="contained"
                >
                  Register
                </Button>
              </div>
            </form>
            <Typography
              style={{ color: "#303F9E", fontSize: 15, marginBottom: "15px" }}
            >
              Already have an account?
              <Link style={{ color: "#303F9E" }} to={`/student/login`}>
                {" "}
                Login
              </Link>
            </Typography>
          </Paper>
        </Box>
      </React.Fragment>
    </>
  );
};

export default Register;
