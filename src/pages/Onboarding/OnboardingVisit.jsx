import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const OnboardingVisit = () => {
  const { logout } = useAuth0();
  const handleLogout = () => logout({ returnTo: window.location.origin });

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={2}
    >
      <Typography align="center">
        A helpers staff member will reach out to you about approving your
        account.
      </Typography>
      <Box py={2} />
      <Typography align="center">
        For questions, please contact us at support@gethelpers.ca.
      </Typography>
      <Button onClick={handleLogout}>Logout</Button>
    </Box>
  );
};

export default OnboardingVisit;
