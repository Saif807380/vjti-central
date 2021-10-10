import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, ListItem, makeStyles } from "@material-ui/core";

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
    color: "black"
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
  }
}));

const ProfileItem = ({
  className,
  icon: Icon,
  title,
  value,
  index,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Button
        // activeClassName={classes.active}
        className={classes.button}
        onClick={() => {}}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>
          {title} : {value}
        </span>
      </Button>
    </ListItem>
  );
};

ProfileItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default ProfileItem;
