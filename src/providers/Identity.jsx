import React, { useContext, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { LinearProgress, Typography } from '@material-ui/core';

const GET_DATA = gql`
  query {
    myUser {
      id
      customerId
      fullName
      phoneNumber
      clients {
        id
        fullName
        approvedAt
      }
    }
  }
`;

const Identity = React.createContext({});
const useIdentity = () => useContext(Identity);

const IdentityProvider = ({ children }) => {
  const [myUser, setMyUser] = useState();
  const { data, refetch, error } = useQuery(GET_DATA);

  useEffect(() => {
    if (!data) return;

    setMyUser(data.myUser);
  }, [data]);

  if (error) {
    console.error(error);
    return <Typography color="error">Failed to fetch user info</Typography>;
  }

  if (myUser === undefined) return <LinearProgress />;

  const hasApprovedClients = ((myUser || {}).clients || []).some(
    (client) => client.approvedAt
  );

  return (
    <Identity.Provider
      value={{ myUser, setMyUser, refetch, hasApprovedClients }}
    >
      {children}
    </Identity.Provider>
  );
};

export { useIdentity };
export default IdentityProvider;
