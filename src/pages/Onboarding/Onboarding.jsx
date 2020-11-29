import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Box } from '@material-ui/core';
import OnboardingAccount from './OnboardingAccount';
import OnboardingHelp from './OnboardingHelp';
import OnboardingPayment from './OnboardingPayment';
import OnboardingVisit from './OnboardingVisit';
import { useIdentity } from '../../providers/Identity';
import paths from '../../constants/paths';
import { TopNav, Logo } from '../../components';

const Onboarding = () => {
  const { myUser } = useIdentity();
  const noAccount = !myUser;
  const noClients = !(myUser || { clients: [] }).clients.length;
  const noCreditCard = !(myUser || {}).customerId;
  const noApprovedClients = !((myUser || {}).clients || []).some(
    (client) => client.approvedAt
  );

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <TopNav>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Logo />
        </Box>
      </TopNav>

      <Switch>
        {noAccount && (
          <Route path={paths.onboardingAccount} component={OnboardingAccount} />
        )}
        {noAccount && <Redirect to={paths.onboardingAccount} />}

        {noClients && (
          <Route path={paths.onboardingHelp} component={OnboardingHelp} />
        )}
        {noClients && <Redirect to={paths.onboardingHelp} />}

        {noCreditCard && (
          <Route path={paths.onboardingPayment} component={OnboardingPayment} />
        )}
        {noCreditCard && <Redirect to={paths.onboardingPayment} />}

        {noApprovedClients && (
          <Route path={paths.onboardingVisit} component={OnboardingVisit} />
        )}
        {noApprovedClients && <Redirect to={paths.onboardingVisit} />}

        <Redirect to={paths.home} />
      </Switch>
    </Box>
  );
};

export default Onboarding;
