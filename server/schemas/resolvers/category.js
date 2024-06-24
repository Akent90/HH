const { Category } = require('../../models');

const resolvers = {
  Query: {
    categories: async () => {
      return Category.find();
    },
    category: async (parent, { id }) => {
      return Category.findById(id);
    },
  },
  Mutation: {
    addCategory: async (parent, { name }) => {
      return Category.create({ name });
    },
    updateCategory: async (parent, { id, name }) => {
      return Category.findByIdAndUpdate(id, { name }, { new: true });
    },
    deleteCategory: async (parent, { id }) => {
      const result = await Category.findByIdAndDelete(id);
      return result !== null;
    },
  },
};

module.exports = resolvers;
