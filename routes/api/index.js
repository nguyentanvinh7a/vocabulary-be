const auth = require('./auth');
const message = require('./message');
const word = require('./word');

const router = require('express').Router();

router.use('/auth', auth);
router.use('/message', message);
router.use('/word', word);


module.exports = router;