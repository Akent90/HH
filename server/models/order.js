const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    status: { type: String, default: 'Pending', required: true },
    total: { type: Number, required: true }
}, { timestamps: true });  // Adds createdAt and updatedAt fields automatically

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

