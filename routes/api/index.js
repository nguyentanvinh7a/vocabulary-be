const auth = require('./auth');
const word = require('./word');
const list = require('./list');
const vocabulary = require('./vocabulary');
const health = require('./health');

const router = require('express').Router();

router.use('/auth', auth);
router.use('/word', word);
router.use('/list', list);
router.use('/vocabulary', vocabulary);
router.use('/health', health);

module.exports = router;