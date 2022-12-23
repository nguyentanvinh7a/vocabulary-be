const Word = require('../../models/Word');

exports.getWords = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        const words = await Word.find({}).populate('relatedWords').limit(limit * 1).skip((page - 1) * limit).exec();
        return res.json(words);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};