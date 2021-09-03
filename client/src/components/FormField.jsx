import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: "15px",
    marginBottom: "20px"
  }
}));

const FormField = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.formControl}>
      <TextField
        variant="outlined"
        label={props.label}
        name={props.name}
        required={props.required}
        onChange={props.onChange}
        error={props.error.length !== 0}
        helperText={props.error}
        fullWidth
        InputProps={props.InputProps}
      />
    </div>
  );
};

export default FormField;
