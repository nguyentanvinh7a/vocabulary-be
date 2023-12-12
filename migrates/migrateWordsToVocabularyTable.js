const mongoose = require('mongoose');
const Word = require('../models/Word');
const Vocabulary = require('../models/Vocabulary');
const ObjectId = mongoose.Types.ObjectId;

const migrateWordsToVocabularyTable = async () => {
  try {
    const listId = '6573216d36f1da0c6cab207c';
    const allWords = await Word.find();

    const vocabularyObjects = allWords.map((word) => {
      return {
        list: ObjectId(listId),
        word: ObjectId(word._id),
      };
    });

    await Vocabulary.insertMany(vocabularyObjects);

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    mongoose.connection.close();
  }
};

mongoose.connect('mongodb+srv://nguyentanvinh7a:01685698193@cluster0.ebrk4.mongodb.net/vocabulary?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

migrateWordsToVocabularyTable();
