const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    orders: [Order]
    cart: [CartItem]
    createdAt: String!
    updatedAt: String!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  extend type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(id: ID!, firstName: String, lastName: String, email: String, password: String): User
    deleteUser(id: ID!): Boolean
    login(email: String!, password: String!): Auth
  }

  type Auth {
    token: String
    user: User
  }
`;

module.exports = typeDefs;

