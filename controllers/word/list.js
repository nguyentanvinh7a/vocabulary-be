const Word = require('../../models/Word');

exports.getWords = async (req, res) => {
    try {
        const words = await Word.find({}).populate('relatedWords');
        return res.json(words);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
};