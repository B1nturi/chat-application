// external imports
const express = require('express');

// internal imports
const { getLogin, postLogin } = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// router
const router = express.Router();

// login page
router.get('/', decorateHtmlResponse("Login"), getLogin);

// process login
router.post('/', postLogin);

// export
module.exports = router;