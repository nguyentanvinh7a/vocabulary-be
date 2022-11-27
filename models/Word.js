const mongoose = require('mongoose');

const type = ['adj', 'adv', 'conj', 'det', 'n', 'prep', 'pron', 'v'];

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    meaning: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meaning',
        required: true
    },
    type: {
        type: [String],
        enum: type,
        required: true
    },
    relatedWords: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Word',
        required: false
    },
}, { timestamps: true });


const Word = mongoose.model('Word', wordSchema);

module.exports = Word;