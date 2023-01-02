const auth = require('./auth');
const word = require('./word');
const list = require('./list');
const vocabulary = require('./vocabulary');

const router = require('express').Router();

router.use('/auth', auth);
router.use('/word', word);
router.use('/list', list);
router.use('/vocabulary', vocabulary);

module.exports = router;