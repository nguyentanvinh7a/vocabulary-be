const Word = require('../../models/Word');

const getWordsWithPagination = async (query, page = 1, limit = 10) => {
  try {
    const words = await Word.find(query)
      .sort({ updatedAt: -1 })
      .populate('relatedWords')
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return words;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
};

exports.getWords = async (req, res) => {
  try {
    const { q: search } = req.query;
    let { page, limit } = req.query;

    page = page || 1;
    limit = limit || 10;

    let query = {};

    if (search) {
      query = {
        $or: [
          { word: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const words = await getWordsWithPagination(query, page, limit);

    return res.json(words);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
};
