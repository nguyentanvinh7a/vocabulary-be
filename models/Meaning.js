const mongoose = require('mongoose');

const level = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const meaningSchema = new mongoose.Schema({
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word',
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    example: {
        type: [String],
        required: false
    },
    level: {
        type: String,
        enum: level,
        required: false
    },
    pronunciation: {
        type: String
    },
    imageLink: {
        type: String,
        required: false
    },
}, { timestamps: true });


const Meaning = mongoose.model('Meaning', meaningSchema);

module.exports = Meaning;