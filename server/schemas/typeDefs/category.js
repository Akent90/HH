const { gql } = require('@apollo/server');

const typeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }
`;

module.exports = typeDefs;
