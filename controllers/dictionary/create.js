//const Meaning = require('../../models/Meaning');
//const Word = require('../../models/Word');

//exports.createMeaning = async (req, res) => {

//    try {
//        const { word: wordId, meaning, example, level, pronunciation, imageLink } = req.body;

//        const word = await Word.findById(wordId);

//        if (!word) {
//            return res.status(404).json({ msg: 'Word not found' });
//        } else {
//            if (!meaning) {
//                return res.status(400).json({ msg: 'Please enter all fields' });
//            }

//            const newMeaning = new Meaning({
//                word: word._id,
//                meaning,
//                example,
//                level,
//                pronunciation,
//                imageLink
//            });

//            const meaningCreated = await newMeaning.save();

//            return res.json(meaningCreated);
//        }
//    } catch (err) {
//        res.status(500).send(err.message);
//    }
//};