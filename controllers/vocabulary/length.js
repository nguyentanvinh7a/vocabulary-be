const Vocabulary = require('../../models/Vocabulary');
const { default: mongoose } = require('mongoose');

exports.length = async (req, res) => {
    try {
        const listId = req.params.listId;

        const { q } = req.query;

        const result = await Vocabulary.aggregate([
            { $match: { list: mongoose.Types.ObjectId(listId) } },
            {
                $lookup: {
                    from: 'words',
                    localField: 'word',
                    foreignField: '_id',
                    as: 'word'
                }
            },
            { $unwind: '$word' },
            {
                $match: {
                    $or: [
                        { 'word.word': { $regex: q, $options: 'i' } },
                        { 'note': { $regex: q, $options: 'i' } },
                    ]
                }
            },
            { $count: 'totalCount' }
        ]);

        const wordsLength = result.length > 0 ? result[0].totalCount : 0;

        return res.json(wordsLength);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};
