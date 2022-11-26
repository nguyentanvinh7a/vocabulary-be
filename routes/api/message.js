var express = require('express');
var router = express.Router();
const messageController = require("../../controllers/message");

const isAuth = require('../../controllers/auth').isAuth;

router.post('/create', isAuth, messageController.createMessage);
router.get('/list', isAuth, messageController.listMessage);
router.get('/get/:id', isAuth, messageController.getMessage);

module.exports = router;