const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connString = 'mongodb://127.0.0.1:27017/hirelens';
        await mongoose.connect(connString);
        console.log(`MongoDB Connected successfully!`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
