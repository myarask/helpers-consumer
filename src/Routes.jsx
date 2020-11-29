import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Profile from 'pages/Profile';
import ServiceHistory from 'pages/ServiceHistory';
import PaymentMethod from 'pages/PaymentMethod';
import PrivacyAndTerms from 'pages/PrivacyAndTerms';
import Settings from 'pages/Settings';
import Support from 'pages/Support';
import VisitNew from 'pages/VisitNew/VisitNew';
import Visit from 'pages/Visit/Visit';
// import Onboarding from 'pages/Onboarding/Onboarding';

import paths from 'constants/paths';

const Routes = () => {
  return (
    <Switch>
      {/* <Route path={paths.onboarding} component={Onboarding} /> */}

      {/* {noApprovedClients && <Redirect to={paths.onboarding} />} */}

      <Route path={paths.profile} component={Profile} />
      <Route path={paths.serviceHistory} component={ServiceHistory} />
      <Route path={paths.paymentMethod} component={PaymentMethod} />
      <Route path={paths.privacyAndTerms} component={PrivacyAndTerms} />
      <Route path={paths.settings} component={Settings} />
      <Route path={paths.support} component={Support} />
      <Route path={paths.visitNew} component={VisitNew} />
      <Route path={paths.visit} component={Visit} />
      <Route exact path={paths.home} component={Home} />
      <Redirect to={paths.home} />
    </Switch>
  );
};

export default Routes;
