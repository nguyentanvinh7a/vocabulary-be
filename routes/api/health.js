const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Test CI/CD 2');
});

module.exports = router;