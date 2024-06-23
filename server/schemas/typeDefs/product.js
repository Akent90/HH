const { gql } = require('@apollo/server');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String
    imageUrl: String
    price: Float!
    stock: Int
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(name: String!, description: String, imageUrl: String, price: Float!, stock: Int, categoryId: ID!): Product
    updateProduct(id: ID!, name: String, description: String, imageUrl: String, price: Float, stock: Int, categoryId: ID): Product
    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = typeDefs;

