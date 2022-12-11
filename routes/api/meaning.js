const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const meaningController = require("../../controllers/meaning");

router.post('/create', isAuth, verifyRoles(ROLE_LIST.ADMIN), meaningController.createMeaning);
router.get('/getByWordId/:wordId', isAuth, verifyRoles(ROLE_LIST.ADMIN), meaningController.getByWordId);

module.exports = router;
