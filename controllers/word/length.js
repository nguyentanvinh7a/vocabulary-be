const Word = require('../../models/Word');

exports.length = async (req, res) => {
    try {
        const wordsLength = await Word.countDocuments();
        return res.json(wordsLength);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};