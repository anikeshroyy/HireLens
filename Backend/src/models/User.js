const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 30,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://www.svgrepo.com/show/355688/user-a-solid.svg"
    },
    phone: {
        type: String,
        maxlength: 10,
        minlength: 10,
    },
    city: {
        type: String,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);