const { mergeTypeDefs } = require('@graphql-tools/merge');
const productTypeDefs = require('./product');
const userTypeDefs = require('./user');
const orderTypeDefs = require('./order');
const categoryTypeDefs = require('./category');

const typeDefs = mergeTypeDefs([productTypeDefs, userTypeDefs, orderTypeDefs, categoryTypeDefs]);

module.exports = typeDefs;


