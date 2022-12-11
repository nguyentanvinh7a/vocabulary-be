const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    listName: {
        type: String,
        required: true
    },
}, { timestamps: true });


const List = mongoose.model('List', listSchema);

module.exports = List;