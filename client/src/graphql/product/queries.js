import { gql } from '@apollo/client';

// Fetch all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      stock
      category {
        id
        name
      }
    }
  }
`;

// Fetch a single product by ID
export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      stock
      category {
        id
        name
      }
    }
  }
`;
