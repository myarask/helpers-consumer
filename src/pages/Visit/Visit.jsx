import React from 'react';
import { useParams, Switch, Route } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { LinearProgress } from '@material-ui/core';
import VisitRelease from './Visit1Release';
import VisitMatch from './Visit2Match';
import VisitStarted from './Visit3Started';
import VisitFinished from './Visit4Finished';
import { BackTopNav } from '../../components';

const DATA = gql`
  query Visit($id: Int!) {
    visit(id: $id) {
      agencyUserId
      createdAt
      releasedAt
      matchedAt
      startedAt
      finishedAt
      cancelledAt
      notes
      baseFee
      client {
        fullName
      }
      services {
        fee
        name
        id
        serviceId
      }
      agencyUser {
        id
        user {
          fullName
          phoneNumber
        }
      }
    }
  }
`;

const Visit = () => {
  const { id } = useParams();
  const { data, loading, refetch } = useQuery(DATA, {
    variables: { id: Number(id) },
    pollInterval: 10000,
  });

  return (
    <>
      {loading && (
        <>
          <BackTopNav />
          <LinearProgress />
        </>
      )}
      {data && (
        <Switch>
          {!data.visit.releasedAt && (
            <Route
              render={() => <VisitRelease {...data.visit} refetch={refetch} />}
            />
          )}
          {!data.visit.matchedAt && <Route component={VisitMatch} />}
          {!data.visit.finishedAt && (
            <Route render={() => <VisitStarted {...data.visit} />} />
          )}
          {data.visit.finishedAt && (
            <Route render={() => <VisitFinished {...data.visit} />} />
          )}
        </Switch>
      )}
    </>
  );
};

export default Visit;
