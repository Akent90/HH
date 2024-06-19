const { AuthenticationError } = require('apollo-server-express');
const { User, Order } = require('../../models');
const { signToken } = require('../../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('orders');
      }
      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().populate('orders');
    },
    user: async (parent, { id }) => {
      return User.findById(id).populate('orders');
    },
  },
  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    updateUser: async (parent, { firstName, lastName, email, password }, context) => {
      if (context.user) {
        return User.findByIdAndUpdate(
          context.user._id,
          { firstName, lastName, email, password },
          { new: true }
        );
      }
      throw new AuthenticationError('Not logged in');
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
};

module.exports = resolvers;
