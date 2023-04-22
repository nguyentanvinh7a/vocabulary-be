const Word = require('../../models/Word');

exports.getWords = async (req, res) => {
    try {
        const { page = 1, q: search } = req.query;
        let { limit } = req.query;
        if (search === undefined) {
            limit = limit ? limit : 10;
        } else if (search === "") {
            limit = 10;
        } else {
            limit = 100;
        }

        const words = await Word.find({
            $or: [
                { word: { $regex: search || '', $options: 'i' } },
            ]
        }).sort({ updatedAt: -1 }).populate('relatedWords').limit(limit * 1).skip((page - 1) * limit).exec();
        return res.json(words);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};