import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from "@material-ui/core";
import { User, GitHub, Linkedin, Twitter } from "react-feather";

const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%"
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  },
  title: {
    marginRight: "auto"
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& $icon": {
      color: theme.palette.primary.main
    }
  },
  mobileDrawer: {
    width: 256,
    backgroundColor: "white"
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    zIndex: 1,
    height: 500,
    backgroundColor: "white"
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    backgroundColor: theme.palette.primary.main
  }
}));

const NavBar = ({ detailList, onMobileClose, openMobile }) => {
  const classes = useStyles();
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={User} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {detailList.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {detailList.github && (
            <Button
              activeClassName={classes.active}
              className={classes.button}
              href={detailList.github}
            >
              {<GitHub className={classes.icon} size="20" />}
              <span className={classes.title}>Github</span>
            </Button>
          )}

          {detailList.github && (
            <Button
              activeClassName={classes.active}
              className={classes.button}
              href={detailList.linkedin}
            >
              {<Linkedin className={classes.icon} size="20" />}
              <span className={classes.title}>LinkedIn</span>
            </Button>
          )}
          {detailList.github && (
            <Button
              activeClassName={classes.active}
              className={classes.button}
              href={detailList.twitter}
            >
              {<Twitter className={classes.icon} size="20" />}
              <span className={classes.title}>Twitter</span>
            </Button>
          )}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
