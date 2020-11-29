const { gql } = require('apollo-server-express');

module.exports = gql`
  type Client {
    id: Int!
    userId: Int!
    approvedAt: String
    fullName: String!
    city: String!
    country: String!
    line1: String!
    line2: String
    postalCode: String!
    state: String!
    phoneNumber: String
  }

  type AgencyUser {
    id: Int
    user: User
  }

  type User {
    id: Int!
    email: String
    fullName: String
    customerId: String
    clients: [Client]
    phoneNumber: String
  }

  type Service {
    id: Int!
    name: String
    fee: Int
  }

  type VisitServices {
    id: Int
    visitId: Int
    serviceId: Int
    name: String
    fee: Int
  }

  input ClientInput {
    fullName: String!
    city: String!
    country: String!
    line1: String!
    line2: String
    postalCode: String!
    state: String!
    phoneNumber: String
  }

  type Visit {
    id: Int
    clientId: Int
    userId: Int
    agencyUserId: Int
    notes: String
    city: String
    country: String
    line1: String
    line2: String
    postalCode: String
    state: String
    createdAt: String
    releasedAt: String
    matchedAt: String
    startedAt: String
    finishedAt: String
    cancelledAt: String
    baseFee: Int
    client: Client
    services: [VisitServices]
    agencyUser: AgencyUser
  }

  input VisitInput {
    clientId: Int!
    notes: String
    serviceIds: [Int!]!
  }

  type Query {
    activeVisits: [Visit]
    visit(id: Int!): Visit
    myUser: User
    services: [Service]
  }

  type Mutation {
    createMyUser(fullName: String!, phoneNumber: String): User
    updateMyUser(fullName: String!, phoneNumber: String): User
    createMyClient(values: ClientInput): Client
    draftVisit(input: VisitInput): Visit
    releaseVisit(id: ID!): Visit
    cancelVisit(id: ID!): Visit
    saveMyCard(paymentMethodId: String!): String
  }
`;
