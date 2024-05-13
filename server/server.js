require('dotenv').config();

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  try {
    await connectDB(); 
    console.log("Database connected successfully.");

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

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
      console.log('Incoming GraphQL request:', req.body);
      next();
    });

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
