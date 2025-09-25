const express = require('express');
const { placeOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route for placing an order
router.post('/place', protect, placeOrder);

module.exports = router;
