const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Test CI/CD 1');
});

module.exports = router;