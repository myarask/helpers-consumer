import React, { useState } from 'react';
import {
  Avatar,
  IconButton,
  List,
  SwipeableDrawer,
  Box,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth0 } from '@auth0/auth0-react';
import { useIdentity } from '../providers/Identity';
import paths from '../constants/paths';
import TopNav from './TopNav';
import Logo from './Logo';
import NavItem from './NavItem';

const NavBar = () => {
  const { myUser } = useIdentity();
  const { isAuthenticated, logout } = useAuth0();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleLogout = () => logout({ returnTo: window.location.origin });

  if (!isAuthenticated) return null;

  return (
    <div>
      <TopNav>
        <IconButton aria-label="Main Menu" onClick={handleOpen}>
          <MenuIcon fontSize="small" color="secondary" />
        </IconButton>

        <Logo />

        <Box width="44px" />
      </TopNav>

      <SwipeableDrawer open={open} onClose={handleClose} onOpen={handleOpen}>
        <Box p={2}>
          <Avatar alt={myUser ? myUser.fullName : 'Unknown'} />
          <Box pt={3}>
            <Typography variant="h1">
              <b>{myUser ? myUser.fullName : 'Unknown'}</b>
            </Typography>
          </Box>
        </Box>

        <List component="nav" aria-label="Main Menu">
          <NavItem
            to={paths.home}
            label="Home"
            icon="home"
            onClick={handleClose}
          />
          <NavItem
            to={paths.profile}
            label="Profile"
            icon="person"
            onClick={handleClose}
          />
          <NavItem
            to={paths.paymentMethod}
            label="Payment Method"
            icon="person"
            onClick={handleClose}
          />
          {/* <NavItem
            to={paths.serviceHistory}
            label="Service History"
            icon="history"
            onClick={handleClose}
          /> */}
          {/* <NavItem
            to={paths.privacyAndTerms}
            label="Privacy & Terms"
            icon="lock"
            onClick={handleClose}
          /> */}
          {/* <NavItem
            to={paths.settings}
            label="Settings"
            icon="settings"
            onClick={handleClose}
          /> */}
          <NavItem
            to={paths.support}
            label="Support"
            icon="settings"
            onClick={handleClose}
          />
          <NavItem
            label="Logout"
            icon="exit_to_app"
            to="#"
            onClick={handleLogout}
          />
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default NavBar;
