import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_DATA = gql`
  query {
    activeVisits {
      id
      client {
        id
        fullName
      }
      services {
        id
        serviceId
        name
        fee
      }
      createdAt
      releasedAt
      matchedAt
      startedAt
      finishedAt
    }
  }
`;

const ActiveVisits = React.createContext({});
const useActiveVisits = () => useContext(ActiveVisits);

const ActiveVisitsProvider = ({ children }) => {
  const { data, refetch, loading } = useQuery(GET_DATA, {
    pollInterval: 10000,
  });

  return (
    <ActiveVisits.Provider
      value={{ activeVisits: data && data.activeVisits, refetch, loading }}
    >
      {children}
    </ActiveVisits.Provider>
  );
};

export { useActiveVisits };
export default ActiveVisitsProvider;
