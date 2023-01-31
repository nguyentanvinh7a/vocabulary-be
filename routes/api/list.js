const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const listController = require("../../controllers/list");

router.post('/create', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), listController.createList);
router.get('/getByUserId', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), listController.getByUserId);
router.get('/length', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), listController.length);

module.exports = router;
