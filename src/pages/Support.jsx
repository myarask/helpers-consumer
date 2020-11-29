import React from 'react';
import { Box, Typography, Link } from '@material-ui/core';
import paths from 'constants/paths';

const Support = () => {
  return (
    <Box p={2}>
      <Typography variant="h1" gutterBottom>
        <b>Support</b>
      </Typography>
      <Typography>
        <>For information on the Helpers app, please see </>
        <Link href={paths.helpersFAQ} target="_blank" rel="noopener noreferrer">
          our FAQ
        </Link>
        <> or email us at </>
        <Link
          href="mailto:support@gethelpers.ca"
          target="_blank"
          rel="noopener noreferrer"
        >
          support@gethelpers.ca
        </Link>
      </Typography>
    </Box>
  );
};

export default Support;
