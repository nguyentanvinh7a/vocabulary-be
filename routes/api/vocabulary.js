const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const vocabularyController = require("../../controllers/vocabulary");

router.post('/create', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.createVocabulary);
router.get('/getByListId/:listId', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.getByListId);

module.exports = router;
