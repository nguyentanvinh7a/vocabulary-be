//const Meaning = require('../../models/Meaning');
//const Word = require('../../models/Word');

//exports.getByWordId = async (req, res) => {
//    try {
//        const wordId = req.params.wordId;
//        const word = await Word.findById(wordId);
//        if (!word) {
//            return res.status(404).json({ msg: 'Word not found' });
//        } else {
//            const meanings = await Meaning.find({ wordId });
//            return res.json({ word, meanings });
//        }
//    } catch (err) {
//        console.log(err.message);
//        res.status(500).send('Server Error');
//    }
//};