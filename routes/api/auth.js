var express = require('express');
var router = express.Router();
const authController = require("../../controllers/auth");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/confirmSignUp', authController.confirmSignUp);
router.post('/refreshToken', authController.refreshToken);

module.exports = router;