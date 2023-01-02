const Word = require('../../models/Word');
const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.updateVocabulary = async (req, res) => {

    try {
        const { _id, note, imageLink } = req.body;

        const oldVocabulary = await Vocabulary.findById(_id);
        const newVocabulary =  oldVocabulary;

        if (oldVocabulary) {
            if(note) {
                newVocabulary.note = note;
            }
            if(imageLink) {
                newVocabulary.imageLink = imageLink;
            }
            await newVocabulary.save();
            return res.json(newVocabulary);
        } else {
            return res.status(400).json({ msg: 'Vocabulary does not exist' });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when updating word');
    }
};