const Vocabulary = require('../../models/Vocabulary');

exports.deleteVocabulary = async (req, res) => {

    try {
        const _id = req.params.id;

        if (!_id) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        await Vocabulary.findByIdAndDelete(_id);

        res.json({ msg: 'Vocabulary deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when deleting vocabulary');
    }
};