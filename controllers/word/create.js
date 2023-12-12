const Word = require('../../models/Word');
const List = require('../../models/List');
const Vocabulary = require('../../models/Vocabulary');

exports.createWord = async (req, res) => {

    try {
        const { word, type, meaning, example, level, pronunciation, imageLink, relatedWords: relatedIdWords, addToVocabulary, listId } = req.body;

        if (!word || !type) {
            return res.status(400).json({ msg: 'Please enter all fields' });
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

        if (addToVocabulary && listId) {
            const list = await List.findById(listId);
            if (!list) {
                return res.status(400).json({ msg: 'List does not exist' });
            } else {
                const vocabulary = await Vocabulary.findOne({ list: listId, word: newWord._id });
                if (!vocabulary) {
                    const newVocabulary = new Vocabulary({
                        list: listId,
                        word: newWord._id,
                        note: '',
                        imageLink: imageLink || ''
                    });
                    await newVocabulary.save();
                }
            }
        }

        res.json(newWord);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error when creating word');
    }
};