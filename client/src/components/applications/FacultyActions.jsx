import React from "react";
import { Box, Button } from "@material-ui/core";
import { Clear, CheckCircle } from "@material-ui/icons";

const StudentActions = (props) => {
  return (
    <Box display="flex" justifyContent={props.position}>
      <Button
        variant="contained"
        color="primary"
        style={{
          marginRight: "10px",
          backgroundColor: "#4caf50",
          color: "white"
        }}
        startIcon={<CheckCircle />}
      >
        Approve
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: "#f44336", color: "white" }}
        startIcon={<Clear />}
      >
        Reject
      </Button>
    </Box>
  );
};

export default StudentActions;
