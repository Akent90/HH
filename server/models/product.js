const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    categories: [{ type: String }]  // Array of categories for better search and organization
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
