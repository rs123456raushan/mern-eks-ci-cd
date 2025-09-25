const express = require('express');
const {
    addProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add a new product
router.post('/add', protect, addProduct);

// Get all products
router.get('/', protect, getAllProducts);

// Update a product
router.put('/:id', protect, updateProduct);

// Delete a product
router.delete('/:id', protect, deleteProduct);

module.exports = router;
