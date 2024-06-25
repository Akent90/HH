const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    imageUrl: String
    price: Float!
    stock: Int!
    category: Category!
  }

  extend type Query {
    products: [Product]
    product(id: ID!): Product
  }

  extend type Mutation {
    addProduct(name: String!, description: String, imageUrl: String, price: Float!, stock: Int!, categoryId: ID!): Product
    updateProduct(id: ID!, name: String, description: String, imageUrl: String, price: Float, stock: Int, categoryId: ID): Product
    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = typeDefs;




