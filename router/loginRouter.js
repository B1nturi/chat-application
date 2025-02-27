// external imports
const express = require('express');

// internal imports
const { getLogin } = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// router
const router = express.Router();

// login page
router.get('/', decorateHtmlResponse("Login"), getLogin);

// export
module.exports = router;