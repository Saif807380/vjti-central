import React from "react";
import { Box, Button } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const StudentActions = (props) => {
  return (
    <Box display="flex" justifyContent={props.position}>
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "10px" }}
        startIcon={<Edit />}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        style={{ backgroundColor: "#f44336", color: "white" }}
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </Box>
  );
};

export default StudentActions;
