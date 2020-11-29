import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  toolbar: {
    paddingLeft: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const TopNav = ({ children }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar variant="dense" className={classes.toolbar}>
        {children}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
