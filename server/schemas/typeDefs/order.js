const { gql } = require('apollo-server-express');

const typeDefs = gql`
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

  type OrderProduct {
    product: Product!
    quantity: Int!
  }

  extend type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  extend type Mutation {
    createOrder(products: [OrderProductInput!]!): Order
  }

  input OrderProductInput {
    product: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
