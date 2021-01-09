const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const makeModels = require('helpers-database/models/_make');
const createAuth0 = require('./createAuth0');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const directives = require('./directives');
const config = require('./config');

const models = makeModels(config);
const app = express();

const port = process.env.API_PORT || 3005; // TODO: See if this env var can be removed
const origin = process.env.REACT_APP_APP_URL || 'http://localhost:3004';

if (
  !process.env.REACT_APP_AUTH_DOMAIN ||
  !process.env.REACT_APP_AUTH_AUDIENCE
) {
  throw new Error(
    'Please make sure that auth_config.json is in place and populated'
  );
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers: directives.directiveResolvers,
});

const init = async () => {
  const auth0 = await createAuth0();

  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      models,
      user: req.user,
      auth0,
    }),
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Hooks

  // Hook for new user created through auth0
  app.post('/api/users', async (req, res) => {
    // When a new use is created in auth0, we want a user record to
    // be created in the Helpers database
    try {
      const { body } = req;
      const { user, context } = body;

      if (
        ![
          'con_Tni9LLkPJfaCuQDG', // Username-Password in test env
          'con_yeBwfEeh94N9WvOF', // Username-Password in prod env
        ].includes(context.connection.id)
      ) {
        res.send({ message: 'The new user must use a whitelisted connection' });
      }

      if (!user.id) {
        res.send({ message: 'Missing user id' });
      }

      await models.User.create({
        email: user.email,
        auth0Id: `auth0|${user.id}`,
      });

      res.send({ message: 'Success' });
    } catch (e) {
      console.error(e);
    }
  });

  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors({ origin }));
  app.use(
    jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.REACT_APP_AUTH_DOMAIN}/.well-known/jwks.json`,
      }),

      audience: process.env.REACT_APP_AUTH_AUDIENCE,
      issuer: `https://${process.env.REACT_APP_AUTH_DOMAIN}/`,
      algorithm: ['RS256'],
    })
  );
  server.applyMiddleware({ app, path: '/api/graphql' });

  app.listen(port, () => {
    console.log(`API Server listening on port ${port}`);
  });
};

init();
