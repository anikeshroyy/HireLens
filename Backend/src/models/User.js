const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    provider: {
        type: String,
        required: true,
        enum: ['google', 'github']
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);
