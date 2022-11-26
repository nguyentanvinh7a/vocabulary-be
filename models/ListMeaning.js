const mongoose = require('mongoose');

const listMeaningSchema = new mongoose.Schema({
    listId: {
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


const ListMeaning = mongoose.model('ListMeaning', listMeaningSchema);

module.exports = ListMeaning;