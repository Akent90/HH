const { gql } = require('@apollo/server');

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


