import React, { useState } from "react";
import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import FormField from "../../FormField";
import crypto from "crypto";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useAuthState} from "../../../context/AuthContext";

const UserDetails = ({ detailList }) => {
  const [password, setPassword] = useState("");
  const [errors, updateErrors] = useState({
    title: ""
  });
  const { userType, userID, token } = useAuthState();
  const clearErrors = () => {
    updateErrors({
      title: ""
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    clearErrors();
    setIsOpen(false);
  };
  
  const generateFile = () => {
    if (password === null || password.length === 0) {
      updateErrors({
        title: "Password cannot be empty"
      });
      return;
    }

    const encprivkey = localStorage.getItem("encprivkey");
    const publicKey = localStorage.getItem("pubkey");
    const encsecretkey = localStorage.getItem("encsecretkey");
  
    // for private key
    var iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let hash2 = crypto.createHash("sha1");
    let temp_data2 = hash2.update(password, "utf-8");
    let gen_hash2 = temp_data2.digest().slice(0, 16);
    const decipher = crypto.createDecipheriv("aes-128-cbc", gen_hash2, iv);
    let privkey;
   
    try {
      privkey = decipher.update(encprivkey, "hex", "utf-8");
      privkey += decipher.final("utf-8");
   
    } catch (err) {
      setPassword("");
      updateErrors({
        title: "Incorrect Password"
      });
      return;
    }

    // for secret key
    var iv = Buffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    let hash3 = crypto.createHash("sha1");
    let temp_data3 = hash3.update(password, "utf-8");
    let gen_hash3 = temp_data3.digest().slice(0, 16);
    const decipher1 = crypto.createDecipheriv("aes-128-cbc", gen_hash3, iv);
  
    let secretkey;
    try {
     
      secretkey = decipher1.update(encsecretkey, "hex", "utf-8");
      secretkey += decipher1.final("utf-8");
    } catch (err) {
      setPassword("");
      updateErrors({
        title: "Incorrect Password"
      });
      return;
    }
   
    // generate file
    let text = `{  \n    "publicKey": "${publicKey}", \n    "privateKey": "${privkey}", \n    "secretKey": "${secretkey}"\n}`;
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", "credentials.json");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    setPassword("");
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the password to decrypt the private key
          </DialogContentText>
          <>
            <FormField
              label="Password"
              name="password"
              required={true}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.title}
              value={password}
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
          </>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={generateFile}>
            Decrypt
          </Button>
        </DialogActions>
      </Dialog>
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
              {userType=="student"?     <TableRow>
        
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"ID"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.studentID}
                </TableCell>
              </TableRow> :<></>}
              <TableRow> 
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Email"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.email}
                </TableCell>
              </TableRow>
              {userType=="student"?    <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Wallet Balance"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.walletBalance}
                </TableCell>
              </TableRow> :<></>}
              {userType=="student"?    <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Degree"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {detailList.degree}
                </TableCell>
              </TableRow> :<></>}
              <TableRow>
                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  {"Credentials"}
                </TableCell>

                <TableCell style={{ fontSize: "1.1rem", textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                  >
                    Download
                  </Button>
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
