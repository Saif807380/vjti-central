import React from "react";
import { Typography, Divider } from "@material-ui/core";
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
        label={props.labels.PUBLISHED_BY}
        name="organisedBy"
        required={true}
        onChange={props.onFieldChange}
        error={props.errors.organisedBy}
      />
      <FormField
        label={props.labels.DOI}
        name="doi"
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
      <KeyboardDatePicker
        disableFuture
        inputVariant="outlined"
        label={props.labels.PUBLISH_DATE}
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
    </MuiPickersUtilsProvider>
  );
};

export default OtherAchievementsForm;
