import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useAuthState, useAuthDispatch } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import { login } from "../../actions/authActions";
import { SnackbarContext } from "../../context/SnackbarContext";
import { REQUEST_LOGIN, LOGIN_ERROR } from "../../reducers/types";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "80vh"
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
    marginTop: "15px",
    marginBottom: "20px"
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const { isAuthenticated, loading, userType } = useAuthState();
  const dispatch = useAuthDispatch();
  const history = useHistory();
  const { setOpen, setSeverity, setMessage } = useContext(SnackbarContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberme, setRememberme] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRememberme = (e) => setRememberme(e.target.checked);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [errors, updateErrors] = React.useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (isAuthenticated && userType === props.userType) {
      history.push(`/${props.userType}`);
    }
  }, [history, isAuthenticated, userType, props.userType]);

  function isFormValid() {
    let formIsValid = true;
    if (!email) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: "* Email can't be Empty"
      }));
    } else if (!email.includes(".vjti.ac.in")) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: "* Please use VJTI Email ID only"
      }));
    } else {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        email: ""
      }));
    }

    if (password.length < 8) {
      formIsValid = false;
      updateErrors((prevErrors) => ({
        ...prevErrors,
        password: "* Password too short"
      }));
    } else {
      updateErrors((prevErrors) => ({
        ...prevErrors,
        password: ""
      }));
    }

    return formIsValid;
  }

  const handleFormSubmit = (event) => {
    dispatch({ type: REQUEST_LOGIN });
    event.preventDefault();
    if (isFormValid()) {
      login({
        dispatch,
        email,
        password,
        rememberme,
        userType: props.userType
      }).then((res) => {
        if (res.error) {
          setSeverity("error");
          setMessage(res.error);
          setOpen(true);
        } else {
          setSeverity("success");
          setMessage("You have successfully logged in.");
          setOpen(true);
          history.push(`/${props.userType}`);
        }
      });
    }
    dispatch({ type: LOGIN_ERROR });
  };

  return loading ? (
    <Spinner />
  ) : (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Paper elevation={3} className={classes.paper}>
        <div style={{ marginTop: "24px" }}>
          <Typography variant="h5">{props.name} Login</Typography>
        </div>
        <form className={classes.form} noValidate>
          <div className={classes.formInner}>
            <div className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Email"
                required
                onChange={handleEmail}
                error={errors.email.length !== 0}
                helperText={errors.email}
                fullWidth
              />
            </div>
            <div className={classes.formControl}>
              <TextField
                variant="outlined"
                label="Password"
                required
                onChange={handlePassword}
                error={errors.password.length !== 0}
                helperText={errors.password}
                fullWidth
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
            </div>
            <FormControlLabel
              style={{ marginBottom: "5px" }}
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={rememberme}
                  onChange={handleRememberme}
                />
              }
              label="Remember Me"
            />
            <div>
              <Button
                onClick={handleFormSubmit}
                size="large"
                color="primary"
                type="submit"
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </div>
          </div>
        </form>
        <Typography
          style={{ color: "#303F9E", fontSize: 15, marginBottom: "15px" }}
        >
          Don't have an account?
          <Link style={{ color: "#303F9E" }} to={`/${props.userType}/register`}>
            {" "}
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
