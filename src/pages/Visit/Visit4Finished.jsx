import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import paths from '../../constants/paths';
import { BackTopNav } from '../../components';

const VisitFinished = ({ agencyUser }) => {
  return (
    <Box display="flex" flexDirection="column" height="100%">
      <BackTopNav />
      <Box p={2}>
        <Typography>
          {`${agencyUser.user.fullName} has completed the visit`}
        </Typography>
      </Box>

      <Box p={2}>
        <Button component={Link} to={paths.home} fullWidth>
          Return Home
        </Button>
      </Box>
    </Box>
  );
};

export default VisitFinished;
