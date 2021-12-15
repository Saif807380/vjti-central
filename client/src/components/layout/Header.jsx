import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SchoolRoundedIcon from "@material-ui/icons/SchoolRounded";
import MoreIcon from "@material-ui/icons/MoreVert";
import {
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from "@material-ui/core";
import { useAuthDispatch, useAuthState } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  button: {
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  navButton: {
    marginRight: "15px"
  }
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { isAuthenticated, userType } = useAuthState();
  const dispatch = useAuthDispatch();

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const navigationHandler = (route) => {
    handleMobileMenuClose();
    history.push(route);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.replace("/");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAuthenticated ? (
        <div>
          {userType === "student" && (
            <MenuItem onClick={() => navigationHandler(`/${userType}/profile`)}>
              <p>Profile</p>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => navigationHandler(`/${userType}/applications`)}
          >
            <p>Applications</p>
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <p>Logout</p>
          </MenuItem>
        </div>
      ) : (
        <div>
          <MenuItem onClick={() => navigationHandler("/student/login")}>
            <p>Student Section</p>
          </MenuItem>
          <MenuItem onClick={() => navigationHandler("/faculty/login")}>
            <p>Faculty Section</p>
          </MenuItem>
        </div>
      )}
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            disableRipple
            disableFocusRipple
            className={classes.button}
            onClick={() => navigationHandler("/")}
          >
            <SchoolRoundedIcon />
            <Typography variant="h6" noWrap style={{ marginLeft: "10px" }}>
              VJTI Central
            </Typography>
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated ? (
              <div>
                {userType === "student" && (
                  <Button
                    onClick={() => navigationHandler(`/${userType}/profile`)}
                    color="inherit"
                    className={`${classes.navButton} ${classes.button}`}
                    disableRipple
                    disableFocusRipple
                  >
                    <Typography variant="body1" noWrap>
                      Profile
                    </Typography>
                  </Button>
                )}
                <Button
                  onClick={() => navigationHandler(`/${userType}/applications`)}
                  color="inherit"
                  className={`${classes.navButton} ${classes.button}`}
                  disableRipple
                  disableFocusRipple
                >
                  <Typography variant="body1" noWrap>
                    Applications
                  </Typography>
                </Button>
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  className={`${classes.navButton} ${classes.button}`}
                  disableRipple
                  disableFocusRipple
                >
                  <Typography variant="body1" noWrap>
                    Logout
                  </Typography>
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  onClick={() => navigationHandler("/student/login")}
                  color="inherit"
                  className={`${classes.navButton} ${classes.button}`}
                  disableRipple
                  disableFocusRipple
                >
                  <Typography variant="body1" noWrap>
                    Student
                  </Typography>
                </Button>
                <Button
                  onClick={() => navigationHandler("/faculty/login")}
                  color="inherit"
                  disableRipple
                  disableFocusRipple
                  className={classes.button}
                >
                  <Typography variant="body1" noWrap>
                    Faculty
                  </Typography>
                </Button>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </div>
  );
};

export default Header;
