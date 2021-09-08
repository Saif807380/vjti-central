import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import {
  AccessTimeOutlined,
  CheckCircle,
  ClearOutlined
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  greenChip: {
    color: "white",
    backgroundColor: "#4caf50"
  },
  redChip: {
    color: "white",
    backgroundColor: "#f44336"
  }
}));

const StatusChip = (props) => {
  const classes = useStyles();
  return (
    <Chip
      size="medium"
      label={props.status}
      className={
        props.status === "Accepted"
          ? classes.greenChip
          : props.status === "Rejected"
          ? classes.redChip
          : ""
      }
      icon={
        props.status === "Accepted" ? (
          <CheckCircle style={{ color: "white" }} />
        ) : props.status === "Rejected" ? (
          <ClearOutlined style={{ color: "white" }} />
        ) : (
          <AccessTimeOutlined />
        )
      }
    />
  );
};

export default StatusChip;
