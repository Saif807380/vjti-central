import React from "react";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer
} from "@material-ui/core";

const UserDetails = ({ detailList }) => {
  return (
    <>
      <Divider />
      <Box>
        <TableContainer component={Box} style={{ marginTop: "20px" }}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Name"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"ID"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.studentID}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Email"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Wallet Balance"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.walletBalance}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Degree"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.degree}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Credentials"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  <a
                    href={detailList.credentialsURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to view encrypted credentials
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserDetails;
