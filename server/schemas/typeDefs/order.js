const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Order {
        id: ID!
        user: User!
        products: [OrderProduct!]!
        total: Float!
        status: String!
        createdAt: String!
        updatedAt: String
        paymentIntentId: String! 
        paymentStatus: String!
    }

    type OrderProduct {
        product: Product!
        quantity: Int!
        price: Float!
      }
    
      type Query {
        orders: [Order]
        order(id: ID!): Order
      }
    
      type Mutation {
        createOrder(userId: ID!, products: [OrderProductInput!]!, total: Float!, paymentIntentId: String!): Order
        updateOrderStatus(id: ID!, status: String!): Order
        deleteOrder(id: ID!): Boolean
      }
    
      input OrderProductInput {
        productId: ID!
        quantity: Int!
        price: Float!
      }
    `;
    
    module.exports = typeDefs;