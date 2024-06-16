const Product = require('../models/product');

const productResolvers = {
  Query: {
    products: async () => {
      try {
        return await Product.find({});
      } catch (error) {
        throw new Error('Error fetching products');
      }
    },
    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error('Error fetching product');
      }
    },
  },
  Mutation: {
    addProduct: async (_, { name, sku, price, description, stock, categories, imageUrl }) => {
      try {
        const newProduct = new Product({ name, sku, price, description, stock, categories, imageUrl });
        return await newProduct.save();
      } catch (error) {
        throw new Error('Error adding product');
      }
    },
    updateProduct: async (_, { id, ...updates }) => {
      try {
        return await Product.findByIdAndUpdate(id, updates, { new: true });
      } catch (error) {
        throw new Error('Error updating product');
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        return await Product.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Error deleting product');
      }
    },
  },
};

module.exports = productResolvers;
