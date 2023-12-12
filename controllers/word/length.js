const Word = require('../../models/Word');

exports.length = async (req, res) => {
  try {
    const { q: search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { word: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const wordsLength = await Word.countDocuments(query);
    return res.json(wordsLength);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
