const Meaning = require('../../models/Meaning');
const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.createVocabulary = async (req, res) => {

    try {
        const { list: listId, meaning: meaningId, note, imageLink } = req.body;

        const list = await List.findById(listId);
        const meaning = await Meaning.findById(meaningId);

        if (!list) {
            return res.status(404).json({ msg: 'List not found' });
        } else if (!meaning) {
            return res.status(404).json({ msg: 'Meaning not found' });
        } else {
            if (!note) {
                return res.status(400).json({ msg: 'Please enter all fields' });
            }

            if (list.userId.toString() !== req.userId) {
                return res.status(401).json({ msg: 'Not authorized' });
            }

            const newVocabulary = new Vocabulary({
                list: list._id,
                meaning: meaning._id,
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