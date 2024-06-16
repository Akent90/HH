const { gql } = require('apollo-server-express');

const productTypeDefs = gql`
  type Product {
    id: ID!
    name: String!
    sku: String!
    price: Float!
    description: String!
    stock: Int!
    categories: [String]!
    imageUrl: String!
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }

  extend type Mutation {
    addProduct(name: String!, sku: String!, price: Float!, description: String!, stock: Int!, categories: [String]!, imageUrl: String!): Product
    updateProduct(id: ID!, name: String, sku: String, price: Float, description: String, stock: Int, categories: [String], imageUrl: String): Product
    deleteProduct(id: ID!): Product
  }
`;

module.exports = productTypeDefs;
