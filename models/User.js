const mongoose = require('mongoose');
//const crypto = require('crypto');
//const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    name: {
        type: String,
    },
    email:
    {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    image: {
        type: String
    },
    password: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;