const { mergeTypeDefs } = require('@graphql-tools/merge');
const productTypeDefs = require('./product');
const userTypeDefs = require('./user');
const orderTypeDefs = require('./order');

const typeDefs = mergeTypeDefs([productTypeDefs, userTypeDefs, orderTypeDefs]);

module.exports = typeDefs;
