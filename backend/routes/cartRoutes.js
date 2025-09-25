const express = require('express');
const { getCartItems, addToCart } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all cart items for the authenticated user
router.get('/', protect, getCartItems);

// Route for adding a product to the cart
router.post('/add', protect, addToCart);

module.exports = router;
