const auth = require('./auth');
const message = require('./message');
const word = require('./word');
const list = require('./list');
const meaning = require('./meaning');
const vocabulary = require('./vocabulary');

const router = require('express').Router();

router.use('/auth', auth);
router.use('/message', message);
router.use('/word', word);
router.use('/list', list);
router.use('/meaning', meaning);
router.use('/vocabulary', vocabulary);

module.exports = router;