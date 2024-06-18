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

  type Order {
    id: ID!
    products: [OrderProduct!]!
    total: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
    paymentIntentId: String!
    paymentStatus: String!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    updateUser(id: ID!, firstName: String, lastName: String, email: String, password: String): User
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
