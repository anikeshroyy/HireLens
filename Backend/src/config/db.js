require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connString = process.env.MONGODB_URI 
        await mongoose.connect(connString);
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
