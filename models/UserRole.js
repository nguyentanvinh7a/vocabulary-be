const mongoose = require('mongoose');

const userRoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });


const UserRole = mongoose.model('UserRole', userRoleSchema);

module.exports = UserRole;