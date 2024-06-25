const { mergeTypeDefs } = require('@graphql-tools/merge');
const baseTypeDefs = require('./base');
const productTypeDefs = require('./product');
const userTypeDefs = require('./user');
const orderTypeDefs = require('./order');
const categoryTypeDefs = require('./category');

const typeDefs = mergeTypeDefs([
  baseTypeDefs,
  productTypeDefs,
  userTypeDefs,
  orderTypeDefs,
  categoryTypeDefs
]);

module.exports = typeDefs;



