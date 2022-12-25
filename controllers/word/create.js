const Word = require('../../models/Word');

exports.createWord = async (req, res) => {

    try {
        const { word, type, relatedWords: relatedIdWords, meaning, example, level, pronunciation, imageLink } = req.body;

        if (!word || !type) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        if (word.length > 20) {
            return res.status(400).json({ msg: 'Word must be less than 20 characters' });
        }

        const existedWord = await Word.findOne({ word });

        if (existedWord) {
            return res.status(400).json({ msg: 'Word is existed' });
        }

        const relatedWords = [];

        if (relatedIdWords?.length > 0) {
            for (let i = 0; i < relatedIdWords.length; i++) {
                const relatedIdWord = relatedIdWords[i];
                const word = await Word.findById(relatedIdWord);
                if (!word) {
                    return res.status(400).json({ msg: 'Related word does not exist' });
                } else {
                    relatedWords.push(word);
                }
            }
        }

        const newWord = new Word({
            word,
            type,
            relatedWords,
            meaning,
            example,
            level,
            pronunciation,
            imageLink
        });

        await newWord.save();

        if (relatedWords?.length > 0) {
            for (let i = 0; i < relatedWords.length; i++) {
                const relatedWord = relatedWords[i];
                if (!relatedWord.relatedWords.includes(newWord._id)) {
                    relatedWord.relatedWords.push(newWord._id);
                    await relatedWord.save();
                }
            }
        }

        res.json(newWord);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when creating word');
    }
};