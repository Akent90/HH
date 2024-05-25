require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  try {
    await connectDB();
    logger.info("Database connected successfully.");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

    // Logging middleware
    app.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });

    app.use(async (req, res, next) => {
      req = await authMiddleware(req);
      next();
    });

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => ({ user: req.user })
    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.use('/graphql', (req, res, next) => {
      logger.info('Incoming GraphQL request:', req.body);
      next();
    });

    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.listen(PORT, () => {
      logger.info(`API server running on port ${PORT}!`);
      logger.info(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
  }
};

startApolloServer();


