import React from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Card,
  CardContent,
  Divider,
} from '@material-ui/core';
import { Link, useParams, useHistory } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useIdentity } from 'providers/Identity';
import { useActiveVisits } from '../../providers/ActiveVisits';
import paths from '../../constants/paths';
import { TopNav } from '../../components';
import getTotals from '../../utils/getTotals';
import ServiceList from './ServiceList';

const RELEASE_VISIT = gql`
  mutation ReleaseVisit($id: ID!) {
    releaseVisit(id: $id) {
      id
    }
  }
`;

const VisitRelease = ({ baseFee, client, notes, services, refetch }) => {
  const { id } = useParams();
  const activeVisits = useActiveVisits();
  const { myUser } = useIdentity();
  const history = useHistory();
  const [releaseVisit, { loading: isReleasing }] = useMutation(RELEASE_VISIT);
  const { taxes, total, serviceFees } = getTotals(services, baseFee);

  const handleProceed = async () => {
    if (!myUser.customerId) {
      history.push({ pathname: paths.paymentMethod, search: `?visitId=${id}` });
      return;
    }

    await releaseVisit({ variables: { id } });
    await Promise.all([refetch(), activeVisits.refetch()]);
  };

  return (
    <>
      <TopNav>
        <IconButton aria-label="Go Back" component={Link} to={paths.visitNew}>
          <ChevronLeftIcon htmlColor="#FFF" />
        </IconButton>
        <Typography variant="h1">
          <b>Confirm Order</b>
        </Typography>
        <Box width="44px" visibility="hidden" />
      </TopNav>
      <Box m={2}>
        <ServiceList services={services} />
      </Box>

      <Box m={2}>
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
      </Box>
      <Divider />
      <Box p={2}>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Base Fee</Typography>
          <Typography>{`$${(baseFee / 100).toFixed(2)}`}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>Service Fees</Typography>
          <Typography>{serviceFees}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>HST/Taxes (13%)</Typography>
          <Typography>{taxes}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Typography>
            <b>Total</b>
          </Typography>
          <Typography>{total}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box p={2}>
        <Typography align="center">
          Confirm order by tapping &quot;Find a Helper&quot;
        </Typography>
        <Box py={1} />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleProceed}
          disabled={isReleasing}
        >
          Find a Helper
        </Button>
        <Button fullWidth component={Link} to={paths.visitNew}>
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default VisitRelease;
