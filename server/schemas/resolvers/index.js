const { mergeResolvers } = require('@graphql-tools/merge');
const productResolvers = require('./product');
const userResolvers = require('./user');
const orderResolvers = require('./order');
const categoryResolvers = require('./category');

const resolvers = mergeResolvers([productResolvers, userResolvers, orderResolvers, categoryResolvers]);

module.exports = resolvers;





