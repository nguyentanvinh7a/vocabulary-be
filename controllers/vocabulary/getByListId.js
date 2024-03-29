const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.getByListId = async (req, res) => {
    try {
        const listId = req.params.listId;
        let { q, page = 1, limit = 10 } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        if (!listId) {
            return res.status(400).json({ msg: 'List ID is required' });
        }

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).json({ msg: 'List not found' });
        }

        const vocabularies = await Vocabulary.aggregate([
            { $match: { list: list._id } },
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
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]);

        return res.json({ list, vocabularies });
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
};
