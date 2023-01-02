const Word = require('../../models/Word');

exports.updateWord = async (req, res) => {

    try {
        const { _id, word, type, meaning, example, level, pronunciation, imageLink, relatedWords: relatedIdWords } = req.body;

        if (!word) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }

        const oldWord = await Word.findById(_id);

        if (!oldWord) {
            return res.status(400).json({ msg: 'Word does not exist' });
        }

        if (relatedIdWords) {
            const updateRelatedWords = oldWord.relatedWords.map(relatedWord => relatedWord.toString());
            const deletedIdRelatedWords = updateRelatedWords.filter(relatedWord => !relatedIdWords.includes(relatedWord));
            const addedIdRelatedWords = relatedIdWords.filter(relatedIdWord => !updateRelatedWords.includes(relatedIdWord));
            const addedRelatedWords = [];

            if (addedIdRelatedWords.length > 0) {
                for (let i = 0; i < relatedIdWords.length; i++) {
                    const relatedIdWord = relatedIdWords[i];
                    const word = await Word.findById(relatedIdWord);
                    if (!word) {
                        return res.status(400).json({ msg: 'Related word does not exist' });
                    } else {
                        addedRelatedWords.push(word);
                    }
                }
            }


            if (addedIdRelatedWords.length > 0) {
                for (let i = 0; i < addedRelatedWords.length; i++) {
                    const addedRelatedWord = addedRelatedWords[i];
                    if (!addedRelatedWord.relatedWords.includes(_id)) {
                        addedRelatedWord.relatedWords.push(_id);
                        await addedRelatedWord.save();
                    }
                }
            }

            if (deletedIdRelatedWords.length > 0) {
                for (let i = 0; i < deletedIdRelatedWords.length; i++) {
                    const deletedIdRelatedWord = deletedIdRelatedWords[i];
                    const deletedRelatedWord = await Word.findById(deletedIdRelatedWord);
                    if (deletedRelatedWord.relatedWords.includes(_id)) {
                        deletedRelatedWord.relatedWords = deletedRelatedWord.relatedWords.filter(relatedWord => relatedWord.toString() !== _id);
                        await deletedRelatedWord.save();
                    }
                }
            }
        }

        const newWord = oldWord;

        if (word) newWord.word = word;
        if (type) newWord.type = type;
        if (meaning) newWord.meaning = meaning;
        if (example) newWord.example = example;
        if (level) newWord.level = level;
        if (pronunciation) newWord.pronunciation = pronunciation;
        if (imageLink) newWord.imageLink = imageLink;
        if (relatedIdWords) newWord.relatedWords = relatedIdWords;

        const result = await Word.findByIdAndUpdate(_id, newWord, { new: true }).populate('relatedWords');

        return res.json(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when updating word');
    }
};