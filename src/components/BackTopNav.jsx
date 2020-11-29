import React from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TopNav from './TopNav';
import Logo from './Logo';
import paths from '../constants/paths';

const BackTopNav = ({ to, CenterComponent }) => (
  <TopNav>
    <IconButton aria-label="Go Back" component={Link} to={to}>
      <ChevronLeftIcon htmlColor="#FFF" />
    </IconButton>
    <CenterComponent />
    <Box width="44px" />
  </TopNav>
);

BackTopNav.defaultProps = {
  to: paths.home,
  CenterComponent: Logo,
};

export default BackTopNav;
