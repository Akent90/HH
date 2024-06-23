require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
const { authMiddleware } = require('./middleware/auth');
const rateLimit = require('express-rate-limit');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully.");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

    // Logging
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
    });

    await server.start();
    app.use('/graphql', expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user })
    }));

    app.use(express.static(path.join(__dirname, '../client/build')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startApolloServer();




