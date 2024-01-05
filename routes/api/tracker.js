const express = require('express');
const router = express.Router();

const trackerController = require("../../controllers/tracker");

router.post('/', trackerController.tracker);

module.exports = router;
