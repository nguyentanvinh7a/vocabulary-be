const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const listController = require("../../controllers/list");

router.post('/create', isAuth, verifyRoles(ROLE_LIST.USER), listController.createList);
router.get('/getByUserId', isAuth, verifyRoles(ROLE_LIST.USER), listController.getByUserId);

module.exports = router;
