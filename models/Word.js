const mongoose = require('mongoose');

const type = ['v', 'adj', 'adv', 'conj', 'n', 'prep', 'pron', 'interj', 'phrasal', 'idiom', 'colloq', 'other', 'phrase'];
const level = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'other'];

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: type,
        required: true
    },
    relatedWords: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Word',
        required: false
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


const Word = mongoose.model('Word', wordSchema);

module.exports = Word;