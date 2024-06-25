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

  extend type Query {
    orders: [Order]
    order(id: ID!): Order
  }

  extend type Mutation {
    addOrder(products: [OrderProductInput!]!): Order
    updateOrder(id: ID!, status: String): Order
    deleteOrder(id: ID!): Boolean
  }

  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }

  type OrderProduct {
    product: Product!
    quantity: Int!
  }
`;

module.exports = typeDefs;

