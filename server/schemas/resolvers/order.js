const { AuthenticationError } = require('apollo-server-express');
const { Order, Product, User } = require('../../models');

const resolvers = {
  Query: {
    orders: async (parent, args, context) => {
      if (context.user) {
        return Order.find({ user: context.user._id }).populate('products.product');
      }
      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { id }, context) => {
      if (context.user) {
        return Order.findById(id).populate('products.product');
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    createOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({
          user: context.user._id,
          products,
        });

        await order.save();

        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateOrder: async (parent, { id, status }, context) => {
      if (context.user) {
        return Order.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        ).populate('products.product');
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteOrder: async (parent, { id }, context) => {
      if (context.user) {
        return Order.findByIdAndDelete(id);
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
