import React from "react";
import { Typography, Grid, Divider } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FormField from "../FormField";

const OtherAchievementsForm = (props) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Divider />
      <div style={{ marginTop: "16px" }}>
        <Typography variant="h5">{props.domainAchievement}</Typography>
      </div>
      <FormField
        label={props.labels.TITLE}
        name="title"
        required={true}
        onChange={props.onFieldChange}
        error={props.errors.title}
      />
      <FormField
        label={props.labels.ORGANISED_BY}
        name="organisedBy"
        required={true}
        onChange={props.onFieldChange}
        error={props.errors.organisedBy}
      />
      <FormField
        label={props.labels.DESCRIPTION}
        name="description"
        required={true}
        onChange={props.onFieldChange}
        error={props.errors.description}
        multiline={true}
        maxRows={Infinity}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <KeyboardDatePicker
            disableFuture
            inputVariant="outlined"
            label={props.labels.START_DATE}
            name="startDate"
            value={props.startDate}
            placeholder={new Date().toLocaleDateString("en-GB")}
            onChange={(date) => {
              props.onFieldChange({
                target: { name: "startDate", value: date }
              });
            }}
            format="dd/MM/yyyy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyboardDatePicker
            disableFuture
            inputVariant="outlined"
            label={props.labels.END_DATE}
            name="endDate"
            value={props.endDate}
            placeholder={new Date().toLocaleDateString("en-GB")}
            onChange={(date) => {
              props.onFieldChange({
                target: { name: "endDate", value: date }
              });
            }}
            format="dd/MM/yyyy"
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default OtherAchievementsForm;
