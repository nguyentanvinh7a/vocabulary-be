const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.getByListId = async (req, res) => {
    try {
        const listId = req.params.listId;

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ msg: 'List not found' });
        }

        const vocabularies = await Vocabulary.find({ list }).populate({
            path: 'meaning',
            populate: {
                path: 'word'
            }
        });

        return res.json({ list, vocabularies });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};