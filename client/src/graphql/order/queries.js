import { gql } from '@apollo/client';

// Fetch all orders
export const GET_ORDERS = gql`
  query GetOrders {
    orders {
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

// Fetch a single order by ID
export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
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
