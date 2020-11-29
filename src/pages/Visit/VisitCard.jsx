import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const VisitCard = ({ client, notes }) => (
  <Card>
    <CardContent>
      <Typography variant="h2">
        <b>Client</b>
      </Typography>
      <Typography gutterBottom>{client.fullName}</Typography>

      <Box my={2} />
      <Typography variant="h2">
        <b>Notes</b>
      </Typography>
      <Typography gutterBottom>{notes}</Typography>
    </CardContent>
  </Card>
);

export default VisitCard;
