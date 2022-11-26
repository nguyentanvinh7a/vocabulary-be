const mongoose = require('mongoose');

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
    imageLink: {
        type: String
    },
    password: {
        type: String
    },
    userRoleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true
    },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;