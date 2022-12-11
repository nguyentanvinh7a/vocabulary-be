const List = require('../../models/List');

exports.createList = async (req, res) => {
    const { listName } = req.body;
    const userId = req.userId;

    try {
        List.create({
            listName,
            userId
        }).then(list => {
            res.json(list);
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};