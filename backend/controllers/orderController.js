const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
    const { id, shippingAddress } = req.body;
    const userId = req.user.id;

    try {
        const cartItems = await Cart.find({ userId }).populate('productId');
        const item = await Cart.findById(id).populate('productId');
        if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

        const totalPrice = item.productId.price * item.quantity;

        const newOrder = await Order.create({
            userId,
            productId: item.productId,
            totalPrice,
            shippingAddress,
            paymentStatus: 'Pending',
            orderStatus: 'Pending',
        });

        // Process the cart items for the placed order
        await Cart.findByIdAndDelete(id);

        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
