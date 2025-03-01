// external imports
const express = require('express');
const { check } = require('express-validator');

// internal imports
const { getUsers, addUser } = require('../controller/userController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');
const { addUserValidators } = require('../middlewares/users/userValidators');

// router
const router = express.Router();

// users page
router.get('/', decorateHtmlResponse("Users"), getUsers);

// add user
router.post("/", avatarUpload, addUserValidators, addUser);

// export
module.exports = router;