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

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const studentClickHandler = () => {
    history.push("/student");
  };

  const facultyClickHandler = () => {
    history.push("/faculty");
  };

  const navigationHandler = (route) => {
    history.push(route);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      <MenuItem onClick={studentClickHandler}>
        <p>Student Section</p>
      </MenuItem>
      <MenuItem onClick={facultyClickHandler}>
        <p>Faculty Section</p>
      </MenuItem>
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
            <Button
              onClick={() => navigationHandler("/student")}
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
              onClick={() => navigationHandler("/faculty")}
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
