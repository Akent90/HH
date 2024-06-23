const { mergeResolvers } = require('@graphql-tools/merge');
const productResolvers = require('./product');
const userResolvers = require('./user');
const orderResolvers = require('./order');

const resolvers = mergeResolvers([productResolvers, userResolvers, orderResolvers]);

module.exports = resolvers;

