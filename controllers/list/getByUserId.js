const List = require('../../models/List');

exports.getByUserId = async (req, res) => {
    const userId = req.userId;

    try {
        List.find({ userId }).then(list => {
            res.json(list);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};