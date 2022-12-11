const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    meaning: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meaning',
        required: true
    },
    note: {
        type: String,
        required: false
    },
    imageLink: {
        type: String,
        required: false
    },
}, { timestamps: true });


const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);

module.exports = Vocabulary;