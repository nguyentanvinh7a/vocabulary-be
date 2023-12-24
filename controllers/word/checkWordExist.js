const Word = require('../../models/Word');

exports.checkWordExist = async (req, res) => {
  try {
    const wordToCheck = req.params.word;
    const isExist = await Word.findOne({ word: wordToCheck });
    if (isExist) {
      res.status(200).send({ isExist: true });
    } else {
      res.status(200).send({ isExist: false });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};