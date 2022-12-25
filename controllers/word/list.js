const Word = require('../../models/Word');
//const Meaning = require('../../models/Meaning');

exports.getWords = async (req, res) => {
    try {
        const { page = 1, limit = 100 } = req.query;
        //const words = await Word.find({}).populate('relatedWords').limit(limit * 1).skip((page - 1) * limit).exec();
        //for (let i = 0; i < words.length; i++) {
        //    const word = words[i];
        //    const meanings = await Meaning.find({ word });
        //    console.log(meanings);
        //    word.meanings = meanings;
        //}
        //console.log("words: ", words);
        // find all words and its meanings
        const words = await Word.find({}).populate('relatedWords').limit(limit * 1).skip((page - 1) * limit).exec();
        return res.json(words);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
};