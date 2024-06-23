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

  type Product {
    id: ID!
    name: String!
    description: String
    imageUrl: String
    price: Float!
    stock: Int!
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    deleteUser(id: ID!): Boolean
    login(email: String!, password: String!): AuthPayload
    addOrder(products: [OrderProductInput!]!): Order
  }

  type AuthPayload {
    token: String!
    user: User!
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

