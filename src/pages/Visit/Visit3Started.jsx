import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import ServiceList from './ServiceList';
import VisitCard from './VisitCard';
import paths from '../../constants/paths';
import { BackTopNav } from '../../components';

const useStyles = makeStyles(() => ({
  root: {
    background: '#F4F5FA',
  },
  whiteBackground: {
    background: 'white',
  },
}));

const VisitStarted = ({ services, client, notes, agencyUser, startedAt }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <BackTopNav />
      <Box p={2} className={classes.root}>
        <Typography>
          {!startedAt &&
            `${agencyUser.user.fullName} is on the way to the service location`}
          {startedAt &&
            `${agencyUser.user.fullName} is at the service location`}
        </Typography>

        <Box my={2}>
          <Button
            href="tel:+6478809704"
            variant="contained"
            color="primary"
            fullWidth
          >
            Call Helper
          </Button>
        </Box>
        <Box my={2}>
          <Button
            href="sms:+6478809704"
            variant="contained"
            color="primary"
            fullWidth
          >
            Message Helper
          </Button>
        </Box>
      </Box>
      <Box className={classes.whiteBackground} flexGrow={1}>
        <Box p={2}>
          <ServiceList services={services} noFees />
        </Box>
        <Box p={2}>
          <VisitCard client={client} notes={notes} />
        </Box>
        <Box p={2}>
          <Button component={Link} to={paths.home} fullWidth>
            Return Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default VisitStarted;
