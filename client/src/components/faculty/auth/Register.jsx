import React, { useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Box,
  Typography,
  Button,
  Paper,
  FormControl,
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
import { useHistory } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../../../context/AuthContext";
import { SnackbarContext } from "../../../context/SnackbarContext";
import FormField from "../../../components/FormField";
import constants from "../../../constants";
import { register } from "../../../actions/authActions";
import { REQUEST_AUTH, AUTH_ERROR } from "../../../reducers/types";
import { sendOTP } from "../../../actions/authActions";
import OtpPageFaculty from "../../common/inputOtpFaculty";

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
    width: "100%"
  }
}));

const Register = () => {
  const classes = useStyles();
  const { loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState(null);
  const [faculty, setFaculty] = useState({
    facultyID: "",
    name: "",
    email: "",
    password: "",
    department: "",
    position: "",
    description: "",
    publicKey: localStorage.getItem("pubkey")
  });

  const [errors, updateErrors] = useState({
    facultyID: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    position: "",
    description: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [isRegistered, setIsRegistered] = useState(true);
  const handleFaculty = (e) => {
    setFaculty((prevFaculty) => ({
      ...prevFaculty,
      [e.target.name]: e.target.value
    }));
  };

  const isFormValid = () => {
    let formIsValid = true;
    updateErrors({
      facultyID: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      department: "",
      position: ""
    });
    if (faculty.facultyID.length !== 9) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        facultyID: "* Please enter a valid faculty ID"
      }));
      formIsValid = false;
    }
    if (!faculty.name) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        name: "* Please enter your name"
      }));
      formIsValid = false;
    }
    if (!faculty.email) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: "* Email can't be Empty"
      }));
    }
    // else if (!faculty.email.includes("ce.vjti.ac.in")) {
    //   formIsValid = false;
    //   updateErrors((prevErrors) => ({
    //     ...prevErrors,
    //     email: "* Please use VJTI Email ID only"
    //   }));
    // }
    // else {
    //   let isFacultyEmail = false;
    //   for (let i = 0; i < constants.FACULTY_EMAILS.length; i++) {
    //     if (constants.FACULTY_EMAILS[i] === faculty.email) {
    //       isFacultyEmail = true;
    //     }
    //   }
    //   if (!isFacultyEmail) {
    //     formIsValid = false;
    //     updateErrors((prevErrors) => ({
    //       ...prevErrors,
    //       email: "* Please enter a valid Faculty email ID only"
    //     }));
    //   }
    // }
    /* if (faculty.password.length < 8) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        password: "* Password too short"
      }));
    }
    if (faculty.password !== confirmPassword) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "* Password and Confirm Password do not match"
      }));
    }*/
    if (!faculty.department) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        department: "* Please enter your department"
      }));
      formIsValid = false;
    }
    if (!faculty.position) {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        position: "* Please enter your position"
      }));
      formIsValid = false;
    }
    return formIsValid;
  };

  const handleFormSubmit = (event) => {
    dispatch({ type: REQUEST_AUTH });
    event.preventDefault();
    if (isFormValid()) {
      sendOTP({ dispatch, email: faculty.email, type: "Register" }).then(
        (res) => {
          if (res.status === 200) {
            setFormData({
              faculty,
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
    dispatch({ type: AUTH_ERROR });
  };

  return loading ? (
    <Spinner />
  ) : formData ? (
    <OtpPageFaculty type="Register" values={formData} />
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
              {faculty.publicKey}
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
      <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper elevation={isSmallScreen ? 0 : 3} className={classes.paper}>
          <div style={{ marginTop: "24px" }}>
            <Typography variant="h5">Faculty Registration</Typography>
          </div>
          <form className={classes.form} noValidate>
            <div className={classes.formInner}>
              <FormField
                label="Faculty ID"
                name="facultyID"
                required={true}
                onChange={handleFaculty}
                error={errors.facultyID}
              />
              <FormField
                label="Faculty Name"
                name="name"
                required={true}
                onChange={handleFaculty}
                error={errors.name}
              />
              <FormField
                label="Email"
                name="email"
                required={true}
                onChange={handleFaculty}
                error={errors.email}
              />
              {/* <FormField
                label="Password"
                name="password"
                required={true}
                onChange={handleFaculty}
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
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
*/}
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
                error={errors.department.length !== 0}
              >
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={faculty.department}
                  onChange={handleFaculty}
                  label="Department"
                >
                  {constants.DEPARTMENTS.map((dept) => (
                    <MenuItem key={dept} value={dept}>
                      {dept}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.department}</FormHelperText>
              </FormControl>
              <FormField
                label="Position"
                name="position"
                required={true}
                onChange={handleFaculty}
                error={errors.position}
              />
              <FormField
                label="Description"
                name="description"
                required={false}
                onChange={handleFaculty}
                error={""}
              />
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
            <Link style={{ color: "#303F9E" }} to={`/faculty/login`}>
              {" "}
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Register;
