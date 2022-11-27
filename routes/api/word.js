const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const wordController = require("../../controllers/word");

router.post('/create', isAuth, verifyRoles(ROLE_LIST.SUPER_ADMIN, ROLE_LIST.ADMIN), wordController.createWord);

module.exports = router;
