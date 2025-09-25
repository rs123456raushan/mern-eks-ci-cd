const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get all cart items for the authenticated user
exports.getCartItems = async (req, res) => {
    try {
        const userId = req.user.id;

        // Retrieve cart items for the user and populate product details
        const cartItems = await Cart.find({ userId }).populate('productId', 'name price');

        if (!cartItems.length) {
            return res.status(200).json({ message: 'Your cart is empty.' });
        }

        res.status(200).json({ cartItems });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart items.', error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity });
        }

        res.status(201).json({ message: 'Product added to cart' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
};
