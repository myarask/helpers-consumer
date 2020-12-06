import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { MainTopNav, ThemeProvider } from 'components';
import { LinearProgress } from '@material-ui/core';
import Unauthorized from 'pages/Unauthorized';
import history from 'utils/history';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth0 } from '@auth0/auth0-react';
import Routes from './Routes';
import IdentityProvider from './providers/Identity';
import ActiveVisitsProvider from './providers/ActiveVisits';
import paths from './constants/paths';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const App = () => {
  const auth0 = useAuth0();
  const hasError = window.location.search.includes('error=');

  if (auth0.isLoading) {
    return (
      <ThemeProvider>
        <LinearProgress />
      </ThemeProvider>
    );
  }

  if (!auth0.isAuthenticated && !hasError) {
    auth0.loginWithRedirect({});
  }

  if (!auth0.isAuthenticated && hasError) {
    return <Unauthorized />;
  }

  return (
    <ThemeProvider>
      <Elements stripe={stripe}>
        <IdentityProvider>
          <ActiveVisitsProvider>
            <Router history={history}>
              <Switch>
                <Route
                  exact
                  path={[
                    paths.home,
                    paths.paymentMethod,
                    paths.profile,
                    paths.upcomingServices,
                    paths.serviceHistory,
                    paths.support,
                    paths.privacyAndTerms,
                    paths.settings,
                  ]}
                  component={MainTopNav}
                />
              </Switch>
              <Routes />
            </Router>
          </ActiveVisitsProvider>
        </IdentityProvider>
      </Elements>
    </ThemeProvider>
  );
};

export default App;
