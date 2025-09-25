const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
    {
        name: "Wireless Headphones",
        price: 99.99,
        quantity: 5
    },
    {
        name: "Smartphone Case",
        price: 19.99,
        quantity: 5
    },
    {
        name: "Gaming Mouse",
        price: 49.99,
        quantity: 5
    },
    {
        name: "Yoga Mat",
        price: 29.99,
        quantity: 5
    },
    {
        name: "Coffee Mug",
        price: 9.99,
        quantity: 5
    }
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Clear existing products (optional)
        await Product.deleteMany();

        // Insert sample products
        const product = await Product.insertMany(products);
        console.log("Products ===>", product);
        console.log("Products seeded successfully!");
    } catch (err) {
        console.error('MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
