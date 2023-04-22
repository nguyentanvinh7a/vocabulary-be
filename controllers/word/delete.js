const Word = require('../../models/Word');

exports.deleteWord = async (req, res) => {

    try {
        const _id = req.params.id; 

        if (!_id) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        await Word.findByIdAndDelete(_id);

        res.json({ msg: 'Word deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when deleting word');
    }
};