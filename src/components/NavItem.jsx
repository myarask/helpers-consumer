import React from 'react';
import { ListItem, ListItemIcon, ListItemText, Icon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const NavItem = ({ to, label, onClick, icon }) => (
  <ListItem button component={Link} to={to} onClick={onClick}>
    <ListItemIcon>
      <Icon color="primary">{icon}</Icon>
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
);

export default NavItem;
