const Word = require('../../models/Word');

exports.createWord = async (req, res) => {
    const { word, meaning, type, relatedWords } = req.body;
    const newWord = new Word({
        word,
        meaning,
        type,
        relatedWords
    });
    newWord.save().then(word => {
        return res.status(200).json({ msg: 'Word created successfully', word });
    }).catch(err => {
        return res.status(500).json({ msg: 'Error creating word', err });
    });
};