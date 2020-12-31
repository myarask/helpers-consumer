import React from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Heart from '../../assets/heart-solid-teal.svg';
// import { useMutation, gql } from '@apollo/client';
// import { useActiveVisits } from '../../providers/ActiveVisits';
import { BackTopNav } from '../../components';
import paths from '../../constants/paths';

// const CANCEL_VISIT = gql`
//   mutation CancelVisit($id: ID!) {
//     cancelVisit(id: $id) {
//       id
//     }
//   }
// `;

const VisitMatch = () => {
  // const { id } = useParams();
  // const [isBusy, setIsBusy] = useState(false);
  // const activeVisits = useActiveVisits();
  // const history = useHistory();

  // const [cancelVisit] = useMutation(CANCEL_VISIT);

  // const handleCancel = async () => {
  //   setIsBusy(true);
  //   await cancelVisit({ variables: { id } });
  //   await activeVisits.refetch();
  //   history.push(paths.home);
  // };

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <BackTopNav />
      <Box
        p={4}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Typography variant="h2" align="center" gutterBottom>
            We are searching for nearby Helpers
          </Typography>
          <Box display="flex" justifyContent="center" p={2}>
            <img src={Heart} alt="heart" style={{ marginRight: '10px' }} />
            <img src={Heart} alt="heart" style={{ marginRight: '10px' }} />
            <img src={Heart} alt="heart" />
          </Box>
          <Typography variant="h2" align="center">
            You will be notified when there is a match
          </Typography>
          {/* <Button onClick={handleCancel} disabled={isBusy}>
            Cancel Visit
          </Button> */}
          <Box pt={3}>
            <Button
              fullWidth
              component={Link}
              to={paths.home}
              variant="contained"
              color="primary"
            >
              Go to the Home Screen
            </Button>
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default VisitMatch;
