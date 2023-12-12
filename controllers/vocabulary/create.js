const Word = require('../../models/Word');
const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.createVocabulary = async (req, res) => {

    try {
        const { listId, wordId, note, imageLink } = req.body;

        const list = await List.findById(listId);
        const word = await Word.findById(wordId);
        const vocabularies = await Vocabulary.find({ list: listId });
        const existedVocabulary = vocabularies.find(vocabulary => vocabulary.word.toString() === wordId);

        if (existedVocabulary) {
            return res.status(400).json({
                success: false,
                message: 'This word is already in the list'
            });
        }

        if (!list) {
            return res.status(404).json({ msg: 'List not found' });
        } else if (!word) {
            return res.status(404).json({ msg: 'Word not found' });
        } else {
            if (list.userId.toString() !== req.userId) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            const newVocabulary = new Vocabulary({
                list: list._id,
                word: word._id,
                note,
                imageLink
            });

            const vocabularyCreated = await newVocabulary.save();

            return res.json(vocabularyCreated);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
};