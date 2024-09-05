import { gql } from '@apollo/client';

// Create a new order
export const CREATE_ORDER = gql`
  mutation CreateOrder($products: [OrderProductInput!]!) {
    createOrder(products: $products) {
      id
      products {
        product {
          id
          name
        }
        quantity
      }
      total
      status
    }
  }
`;

// Update an order
export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $status: String!) {
    updateOrder(id: $id, status: $status) {
      id
      status
    }
  }
`;

// Delete an order
export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id)
  }
`;
