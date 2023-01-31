const List = require('../../models/List');

exports.length = async (req, res) => {
    try {
        const userId = req.userId;
        const listLength = await List.countDocuments({ userId });
        return res.json(listLength);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};