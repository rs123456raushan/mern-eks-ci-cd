const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        // Validate required fields
        if (!name || !price || !quantity) {
            return res.status(400).json({ message: 'All fields are required: name, price, quantity.' });
        }

        // Create and save the product
        const product = new Product({ name, price, quantity });
        await product.save();

        res.status(201).json({ message: 'Product added successfully.', product });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product.', error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products.', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, quantity },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product updated successfully.', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product.', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product.', error: error.message });
    }
};
