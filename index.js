require('dotenv').config();
const debug = require('debug')('app:server');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const typeDefs = require('./app/schemas');
const resolvers = require('./app/resolvers');
const RestoDB = require('./app/dataSources/restoDb');
const WeatherAPI = require('./app/dataSources/weatherApi');

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || 5432,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE || 'resto',
  },
};

const server = new ApolloServer({
  // Quoi ? Décrire au serveur ce que l'on peut lui demander, mais aussi, documenter l'API pour
  // les clients
  typeDefs,
  // Comment ?
  resolvers,
  status400ForVariableCoercionErrors: true,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context() {
    const { cache } = server;
    return {
      dataSources: {
        restoDB: new RestoDB({ cache, knexConfig }),
        weatherAPI: new WeatherAPI({ cache }),
      },
    };
  },
}).then(({ url }) => {
  debug(`🚀  Server ready at: ${url}`);
});
