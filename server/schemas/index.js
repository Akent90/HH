const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const baseTypeDefs = require('./typeDefs/base');
const productTypeDefs = require('./typeDefs/product');
const userTypeDefs = require('./typeDefs/user');
const orderTypeDefs = require('./typeDefs/order');
const categoryTypeDefs = require('./typeDefs/category');

const productResolvers = require('./resolvers/product');
const userResolvers = require('./resolvers/user');
const orderResolvers = require('./resolvers/order');
const categoryResolvers = require('./resolvers/category');

const typeDefs = mergeTypeDefs([baseTypeDefs, productTypeDefs, userTypeDefs, orderTypeDefs, categoryTypeDefs]);
const resolvers = mergeResolvers([productResolvers, userResolvers, orderResolvers, categoryResolvers]);

module.exports = { typeDefs, resolvers };




