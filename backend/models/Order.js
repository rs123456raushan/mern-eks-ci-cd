const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
    orderStatus: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered'], default: 'Pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
