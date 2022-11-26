const mongoose = require('mongoose');

const typeWordSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        unique: true
    },
}, { timestamps: true });


const TypeWord = mongoose.model('TypeWord', typeWordSchema);

module.exports = TypeWord;