import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  FormControl,
  List,
  Select,
  MenuItem,
  TextField,
  Grid,
  LinearProgress,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useActiveVisits } from '../../providers/ActiveVisits';
import Service from './Service';
import { BackTopNav } from '../../components';
import paths from '../../constants/paths';
import { useIdentity } from '../../providers/Identity';

const useStyles = makeStyles((theme) => ({
  divider: {
    width: '100%',
    backgroundColor: '#D8D8D8',
    margin: theme.spacing(2, 0),
  },
}));

const DATA = gql`
  query {
    services {
      id
      name
      fee
    }
  }
`;

const DRAFT_VISIT = gql`
  mutation DraftVisit($input: VisitInput!) {
    draftVisit(input: $input) {
      id
    }
  }
`;

const CenterComponent = () => (
  <Typography variant="h1">
    <b>Request Helper</b>
  </Typography>
);

const VisitNew = () => {
  const { myUser } = useIdentity();
  const history = useHistory();
  const { data, loading } = useQuery(DATA);
  const [clientId, setClientId] = useState(
    myUser && myUser.clients.length === 1 ? myUser.clients[0].id : undefined
  );
  const { hasApprovedClients } = useIdentity();
  const [serviceIds, setServiceIds] = useState([]);
  const [notes, setNotes] = useState('');
  const [covid1, setCovid1] = useState('');
  const [covid2, setCovid2] = useState('');
  const [covid3, setCovid3] = useState('');
  const { activeVisits, isLoadingActiveVisits } = useActiveVisits();
  const client = myUser.clients.find(({ id }) => id === clientId);

  const [draftVisit] = useMutation(DRAFT_VISIT);

  const isAlreadyBooked =
    activeVisits && activeVisits.some((visit) => visit.client.id === clientId);

  const handleChange = (id) => {
    if (serviceIds.includes(id)) {
      setServiceIds((prev) => prev.filter((x) => x !== id));
    } else {
      setServiceIds((prev) => [...prev, id]);
    }
  };

  const handleProceed = async () => {
    const input = {
      clientId,
      serviceIds,
      notes,
    };
    const resp = await draftVisit({ variables: { input } });
    history.push(paths.visit.replace(':id', resp.data.draftVisit.id));
  };

  const classes = useStyles();

  return (
    <>
      <BackTopNav CenterComponent={CenterComponent} />
      <Box p={2}>
        {!hasApprovedClients && (
          <Box pb={3}>
            <Button
              color="error"
              fullWidth
              component="a"
              target="_blank"
              href={paths.hubspotOnboarding}
            >
              <Typography color="error" align="center">
                <b>
                  <u>Book a home visit</u>
                  <> to complete registration before requesting help</>
                </b>
              </Typography>
            </Button>
          </Box>
        )}
        <Grid container>
          <Grid item xs={12} sm={12}>
            <Typography gutterBottom>
              <b>Who the help is for</b>
            </Typography>
            <FormControl
              fullWidth
              required
              variant="outlined"
              error={isAlreadyBooked}
            >
              <Select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                inputProps={{
                  name: 'client',
                  id: 'client-select',
                }}
                disabled={!hasApprovedClients}
              >
                {myUser &&
                  myUser.clients.map((client) => (
                    <MenuItem key={client.id} value={client.id}>
                      {client.fullName}
                    </MenuItem>
                  ))}
              </Select>
              {isAlreadyBooked && (
                <FormHelperText>This client is already booked</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Divider light className={classes.divider} />
          <Grid item xs={12} sm={12}>
            <Typography>
              <b>Required services</b>
            </Typography>
            {loading && <LinearProgress />}
            <List>
              {data &&
                data.services.map((service) => (
                  <Service
                    key={service.id}
                    {...service}
                    included={serviceIds.includes(service.id)}
                    onClick={() => handleChange(service.id)}
                  />
                ))}
            </List>
          </Grid>
          <Divider light className={classes.divider} />
          <Grid item xs={12} sm={12}>
            <Box pt={1}>
              <Typography gutterBottom>Notes to Helper</Typography>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <Divider light className={classes.divider} />

              {/* <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={check1}
                    onChange={() => setCheck1((prev) => !prev)}
                  />
                }
                label="The care recipient is not a COVID-19 risk"
              /> */}
              <Typography variant="h2" gutterBottom>
                COVID-19 Screening
              </Typography>
              <Typography gutterBottom>
                <b>
                  1. Does {(client || {}).fullName} have any of the following
                  new or worsening symptoms or signs?
                </b>
              </Typography>
              <Typography>- Fever or chills</Typography>
              <Typography>
                - Difficulty breathing or shortness of breath
              </Typography>
              <Typography>- Cough</Typography>
              <Typography>- Sore throat, trouble swallowing</Typography>
              <Typography>
                - Runny nose/stuffy nose or nasal congestion
              </Typography>
              <Typography>- Decrease or loss of smell or taste</Typography>
              <Typography>
                - Nausea, vomiting, diarrhea, abdominal pain
              </Typography>
              <Typography gutterBottom>
                - Not feeling well, extreme tiredness, sore muscles
              </Typography>
              <Typography gutterBottom>
                <i>
                  Symptoms should not be chronic or related to other known
                  causes or conditions.
                </i>
              </Typography>

              <RadioGroup
                row
                value={covid1}
                onChange={(e) => setCovid1(e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                />
              </RadioGroup>

              <Typography gutterBottom>
                <b>
                  2. Has {(client || {}).fullName} travelled outside of Canada
                  in the past 14 days?
                </b>
              </Typography>

              <RadioGroup
                row
                value={covid2}
                onChange={(e) => setCovid2(e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                />
              </RadioGroup>

              <Typography gutterBottom>
                <b>
                  3. Has {(client || {}).fullName} had close contact with a
                  confirmed or probable case of COVID-19?
                </b>
              </Typography>

              <RadioGroup
                row
                value={covid3}
                onChange={(e) => setCovid3(e.target.value)}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio color="primary" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                />
              </RadioGroup>

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleProceed}
                  disabled={
                    isLoadingActiveVisits ||
                    isAlreadyBooked ||
                    !hasApprovedClients ||
                    !serviceIds.length ||
                    covid1 !== 'no' ||
                    covid2 !== 'no' ||
                    covid3 !== 'no'
                  }
                >
                  Proceed
                </Button>
                <Button fullWidth component={Link} to={paths.home}>
                  Go Back
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default VisitNew;
