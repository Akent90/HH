import { gql } from '@apollo/client';

// Add a new product
export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $name: String!
    $description: String
    $price: Float!
    $stock: Int!
    $categoryId: ID!
    $imageUrl: String
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      stock: $stock
      categoryId: $categoryId
      imageUrl: $imageUrl
    ) {
      id
      name
      description
      price
      stock
      category {
        id
        name
      }
      imageUrl
    }
  }
`;

// Update an existing product
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Float
    $stock: Int
    $categoryId: ID
    $imageUrl: String
  ) {
    updateProduct(
      id: $id
      name: $name
      description: $description
      price: $price
      stock: $stock
      categoryId: $categoryId
      imageUrl: $imageUrl
    ) {
      id
      name
      description
      price
      stock
      category {
        id
        name
      }
      imageUrl
    }
  }
`;

// Delete a product
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
