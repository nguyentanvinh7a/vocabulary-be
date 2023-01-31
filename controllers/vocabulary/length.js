const Vocabulary = require('../../models/Vocabulary');

exports.length = async (req, res) => {
    try {
        const listId = req.params.listId;
        const wordsLength = await Vocabulary.countDocuments({ list: listId });
        return res.json(wordsLength);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};