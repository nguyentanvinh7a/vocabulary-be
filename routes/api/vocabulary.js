const express = require('express');
const router = express.Router();
const ROLE_LIST = require('../../config/roles_list');

const isAuth = require('../../controllers/auth').isAuth;
const verifyRoles = require('../../controllers/auth').verifyRoles;

const vocabularyController = require("../../controllers/vocabulary");

router.post('/', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.createVocabulary);
router.put('/', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.updateVocabulary);
router.get('/getByListId/:listId', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.getByListId);
router.get('/length/:listId', isAuth, verifyRoles(ROLE_LIST.USER, ROLE_LIST.ADMIN), vocabularyController.length);

module.exports = router;
