const List = require('../../models/List');

exports.getByUserId = async (req, res) => {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    try {
        List.find({ userId }).limit(limit * 1).skip((page - 1) * limit).exec((err, lists) => {
            if (err) {
                return res.status(500).send(err.message);
            }
            return res.json(lists);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};