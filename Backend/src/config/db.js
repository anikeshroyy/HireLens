const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hirelens';
        console.log(`Connecting to MongoDB...`);
        await mongoose.connect(connString);
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
