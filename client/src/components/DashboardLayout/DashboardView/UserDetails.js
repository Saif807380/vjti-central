import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  makeStyles
} from "@material-ui/core";




const useStyles = makeStyles(() => ({
  root: {
    height: "100%"
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const UserDetails= ({ detailList,className, setCounter, ...rest }) => {

  const [isLoading, setIsLoading] = useState(false);
  
  
 
  

  return  (
  <>
    
      <Divider />
      
        <Box>
       
        <TableContainer component={Box} style={{marginTop:'20px'}}>
        <Table>
         
          <TableBody>
        
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Name"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.name}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"ID"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.studentID}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Email"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.email}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Coin Balance"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.walletBalance}
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
               
                    {"Degree"}
              
                </TableCell>
              
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                 {detailList.degree}
                </TableCell>
              </TableRow>
              <TableRow >
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

UserDetails.propTypes = {
  className: PropTypes.string
};

export default UserDetails
