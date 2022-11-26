 const auth = require('./auth');
 const message = require('./message');

const router = require('express').Router();

router.use('/auth', auth);
router.use('/message', message);

module.exports = router;