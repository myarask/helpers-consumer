module.exports = {
  client: (Visit) => Visit.getClient(),
  services: (Visit) => Visit.getVisitServices(),
  agencyUser: (Visit) => Visit.getAgencyUser(),
};
